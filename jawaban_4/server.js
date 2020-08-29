const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');
const mysql = require('mysql');
const { flash } = require('express-flash-message');
const session = require('express-session');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname + '/public/videos/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

const uploadVideo = multer({
    storage: storage
}).single('video');

const uploadImage = multer({
    storage: storage
}).single('thumbnail');

const upload = multer({ dest: __dirname + '/public/videos' });

const app = express();

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'vera',
    resave: false,
    saveUninitialized: false
}));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vera_dumbways'
});

conn.connect(err => {
    if (err) throw err;

    console.log('Mysql is Connected!');
});
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(__dirname + '/public'));

app.get('/*', function (req, res, next) {
    req.session.flash = [];
    next();
});

app.get('/', (req, res, next) => {
    let sqlGetVideo = "SELECT * FROM video_tb LEFT JOIN category_tb ON video_tb.category_id = category_tb.id";
    conn.query(sqlGetVideo, async (err, videos) => {
        if (err) throw err;

        let message = await req.consumeFlash('notify');
        let errorMsg = await req.consumeFlash('error');
        res.render('home_page', {
            videos: videos,
            message: message ? message[0] : null,
            error: errorMsg ? errorMsg[0] : null
        });
    });
});

// untuk ke halaman buat video
app.get('/video/create', (req, res, next) => {
    let getCategoriesSql = "SELECT * FROM category_tb";
    conn.query(getCategoriesSql, (err, categories) => {
        if (err) throw err;
        res.render('form_video', {
            categories: categories
        });
    });
})

// untuk menyimpan data Video
app.post('/video/store', upload.fields('video', 'thumbnail'), (req, res, next) => {
    let thumbnailPath = '';
    let videoPath = '';
    let sqlPostVideo = `INSERT INTO video_tb VALUES (NULL, '${req.body.title}', '${req.body.category_id}', '${videoPath}', '${thumbnailPath}')`;
    conn.query(sqlPostVideo, async (err, result) => {
        if (err) {
            console.log('first error', err);
            await req.flash('error', 'Gagal Melakukan Penyimpanan!');
            return res.redirect('/');
        }

        res.redirect('/');
    })
    // uploadImage(req, res, async errImage => {
    //     let thumbnailPath = '';
    //     if (errImage) {
    //         console.log('second err', errImage, req.body);
    //         await req.flash('error', 'Gagal Mengupload Thumbnail');
    //         return res.redirect('/');
    //     }
    //     uploadVideo(req, res, async errVid => {
    //         let videoPath = '';
    //         if (err) {
    //             console.log('third err', errVid, req.body);
    //             await req.flash('error', 'Gagal Mengupload Video');
    //             return res.redirect('/');
    //         }
    //         let sqlPostVideo = `INSERT INTO video_tb VALUES (NULL, '${req.body.title}', '${req.body.category_id}', '${videoPath}', '${thumbnailPath}')`;
    //         conn.query(sqlPostVideo, async (err, result) => {
    //             if (err) {
    //                 console.log('first error', err);
    //                 await req.flash('error', 'Gagal Melakukan Penyimpanan!');
    //                 return res.redirect('/');
    //             }

    //             res.redirect('/');
    //         })
    //     })
    // })

})

// untuk mengupdate video
app.post('/video/update/:id', (req, res, next) => {
    let sqlPostVideo = `UPDATE video_tb SET title='${req.body.title}', category_id='${req.body.category_id}', attache='${req.body.attache}', thumbnail='${rqe.body.thumbnail}' WHERE id = '${req.params.id}'`;
    conn.query(sqlPostVideo, body, (err, result) => {
        if (err) throw err;

        res.redirect('/');
    })
});

// untuk menghapus video
app.post('/video/destroy/:id', (req, res, next) => {
    let sqlDeleteVideo = `DELETE FROM video_tb WHERE id='${req.params.id}'`;
    conn.query(sqlDeleteVideo, (err, result) => {
        if (err) throw err;

        res.redirect('/');
    })
})

// untuk ke halaman buat category
app.get('/category/create', (req, res, next) => {
    res.render('form_category');
})

// untuk membuat category
app.post('/category/store', (req, res, next) => {
    let sqlPostCategory = `INSERT INTO category_tb VALUES (NULL, '${req.body.name}')`;
    conn.query(sqlPostCategory, async (err, result) => {
        if (err) {
            await req.flash('error', 'Gagal Melakukan Penyimpanan!');
            return res.redirect('/');
        }
        await req.flash('notify', 'Berhasil Menyimpan Data!');
        res.redirect('/');
    })
})

// untuk mengupdate category
app.post('/category/update/:id', (req, res, next) => {
    let sqlPostCategory = `UPDATE category_tb SET name='${req.body.name}' WHERE id = '${req.params.id}'`;
    conn.query(sqlPostCategory, body, (err, result) => {
        if (err) throw err;

        res.redirect('/');
    })
});

// untuk menghapus category
app.post('/category/destroy/:id', (req, res, next) => {
    let sqlDeleteCategory = `DELETE FROM category_tb WHERE id='${req.params.id}'`;
    conn.query(sqlDeleteCategory, (err, result) => {
        if (err) throw err;

        res.redirect('/');
    })
})


app.listen('8080', () => console.log('Server is Running on PORT 8080'));