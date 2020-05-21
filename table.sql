CREATE TABLE `sys.images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `data` longblob,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `isFree` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sys.categories_table` (
  `cid` int(11) NOT NULL,
  `categoryName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cid`)
);

CREATE TABLE `sys.messages_table` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `recipient_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`message_id`)
);


CREATE TABLE `sys.users_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);