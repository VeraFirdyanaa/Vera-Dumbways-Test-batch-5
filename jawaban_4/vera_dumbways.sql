/*
 Navicat Premium Data Transfer

 Source Server         : MAMP LOCAL
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : vera_dumbways

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 29/08/2020 22:21:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category_tb
-- ----------------------------
DROP TABLE IF EXISTS `category_tb`;
CREATE TABLE `category_tb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_tb
-- ----------------------------
INSERT INTO `category_tb` VALUES (1, 'Gaming');
INSERT INTO `category_tb` VALUES (2, 'Hiburan');
INSERT INTO `category_tb` VALUES (3, 'Music');
INSERT INTO `category_tb` VALUES (4, 'Video Game');
INSERT INTO `category_tb` VALUES (5, 'Edukasi');
INSERT INTO `category_tb` VALUES (6, 'Kreatif');
INSERT INTO `category_tb` VALUES (7, 'TV');
INSERT INTO `category_tb` VALUES (8, 'Acara Music');
INSERT INTO `category_tb` VALUES (9, 'Music Videos');
INSERT INTO `category_tb` VALUES (10, 'Makanan');

-- ----------------------------
-- Table structure for video_tb
-- ----------------------------
DROP TABLE IF EXISTS `video_tb`;
CREATE TABLE `video_tb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `attache` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_tb
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
