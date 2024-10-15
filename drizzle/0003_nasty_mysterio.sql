CREATE TABLE `autosync` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`feedId` integer NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`feedId`) REFERENCES `feeds`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `feeds` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`feedId` text NOT NULL,
	`url` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`feedId`) REFERENCES `feeds`(`id`) ON UPDATE no action ON DELETE cascade
);
