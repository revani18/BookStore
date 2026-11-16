-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2026 at 04:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `bio` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `bio`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'Matthew Walker', 'Ilmuwan saraf (neuroscientist) asal Inggris yang menjadi profesor ilmu saraf dan psikologi serta pendiri Center for Human Sleep Science di University of California, Berkeley.', 'authors/UWhedxMTMjXcZSPg8tuvI7JDQNwvplzXqE8tiTGB.jpg', '2026-11-13 01:26:04', '2026-11-15 02:01:45'),
(4, 'Stephen Hawking', 'Lahir di Oxford, Inggris, pada 8 Januari 1942 dan wafat pada 14 Maret 2018. Ia adalah fisikawan teoretis dan kosmolog brilian yang meneliti lubang hitam serta asal-usul alam semesta meski hidup dengan penyakit saraf motorik (ALS) sejak usia 21 tahun.', 'authors/if11NUCibXl3u6dqDVFXGxMrWViHAyzaIvGwMEVL.jpg', '2026-11-15 02:03:20', '2026-11-15 02:03:20'),
(5, 'Morgan Housel', 'Penulis keuangan perilaku (behavioral finance) asal Amerika Serikat yang juga menjabat sebagai mitra di perusahaan modal ventura Collaborative Fund. Sebelumnya, ia merupakan kolumnis ekonomi di The Wall Street Journal dan The Motley Fool.', 'authors/C0WG8gQbjozifvD1JFW2SAXIIfqi44v2Az9IkPWz.jpg', '2026-11-15 02:05:04', '2026-11-15 02:05:04'),
(6, 'Yuval Noah Harari', 'Lahir di Kiryat Ata, Israel, pada 24 Februari 1976. Ia merupakan sejarawan, filsuf, dan profesor di Departemen Sejarah Universitas Ibrani Yerusalem dengan gelar doktor dari Universitas Oxford.', 'authors/x8YaZQEqJ3Q3oyJz5vdofk2pfUbyNQaheL662P9V.jpg', '2026-11-15 02:06:34', '2026-11-15 02:06:34'),
(7, 'B.J. Habibie', 'Lahir di Parepare, Sulawesi Selatan, pada 25 Juni 1936 dan wafat di Jakarta pada 11 September 2019. Ia adalah ilmuwan dirgantara kelas dunia sekaligus Presiden Republik Indonesia ke-3.', 'authors/Q0XgpvtFnwse2W14Zrf4aWFEYWqli4fI3cWxpba7.jpg', '2026-11-15 02:07:50', '2026-11-15 02:07:50'),
(8, 'James Clear', 'Lahir di Hamilton, Ohio, Amerika Serikat, pada 22 Januari 1986. Ia adalah penulis dan pembicara yang berfokus pada pembentukan kebiasaan, pengambilan keputusan, serta peningkatan produktivitas berkelanjutan.', 'authors/J8a5D3x2Wjt3TVgg8J0ItDRBqd072kvLgKAQby8A.jpg', '2026-11-15 02:08:57', '2026-11-15 02:08:57'),
(9, 'Leila S. Chudori', 'Lahir di Jakarta pada 12 Desember 1962. Selain dikenal sebagai sastrawan dan penulis skenario, ia merupakan jurnalis senior yang lama berkarier di majalah Tempo.', 'authors/AcKQ4EFptrQgoVemn6AQDbVWF1IXFkyVNt2hfMSc.png', '2026-11-15 02:10:13', '2026-11-15 02:10:13'),
(10, 'Tere Liye', 'Lahir di Lahat, Sumatera Selatan, pada 21 Mei 1979. Lulusan Fakultas Ekonomi Universitas Indonesia. Dengan nama pena Tere Liye, ia telah menerbitkan puluhan novel best seller di berbagai tema.', 'authors/ak3u1GLwYpGf0RoHYhi2Uu3jcxjwGuF6MSoSpFcl.jpg', '2026-11-15 02:13:56', '2026-11-15 02:13:56'),
(11, 'Pidi Baiq', 'Lahir di Bandung pada 8 Agustus 1972. Ia merupakan seniman multitalenta asal Indonesia yang berprofesi sebagai penulis, musisi (vokalis grup The Panasdalam), ilustrator, komikus, sekaligus dosen di Fakultas Seni Rupa dan Desain ITB.', 'authors/FQsHSzYXfbMKyrLGf4KeZ1aLHusoJlrKGdIaNif6.png', '2026-11-15 02:18:00', '2026-11-15 02:18:00'),
(12, 'J.K. Rowling', 'Lahir di Yate, Inggris, pada 31 Juli 1965. Karyanya telah terjual lebih dari 600 juta eksemplar di seluruh dunia dan menjadikannya salah satu penulis fiksi paling berpengaruh sepanjang sejarah.', 'authors/gaLJojiEisHrjNeaneewnxnNyl4ssBqaDPKEdkcm.jpg', '2026-11-15 02:19:38', '2026-11-15 02:19:38');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `genre_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `isbn` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `author_id`, `genre_id`, `title`, `isbn`, `description`, `price`, `stock`, `cover_image`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 'Why We Sleep', '9786020647845', 'Pembahasan ilmiah mendalam tentang fungsi vital tidur bagi daya ingat, sistem kekebalan tubuh, kesehatan jantung, dan pencegahan penyakit kronis, lengkap dengan tips memperbaiki kualitas tidur.', 110000.00, 13, 'books/Uco6EPF6AytMDBqlZdJ87frWWqEiofiQ7n3zUB5R.webp', '2026-11-13 01:34:55', '2026-11-15 04:00:53'),
(5, 4, 7, 'A Brief History of Time', '9789792299922', 'Penjelasan konsep-konsep besar kosmologi seperti Dentuman Besar (Big Bang), lubang hitam, ruang-waktu, dan mekanika kuantum yang ditulis agar mudah dipahami oleh pembaca awam.', 95000.00, 10, 'books/ni3poOtS6GRFgeS4ZFgxFG6aCOIpp7C4ETGIIkVJ.jpg', '2026-11-15 02:27:36', '2026-11-15 02:27:59'),
(6, 5, 6, 'The Psychology of Money', '9786026486578', 'Kumpulan 19 cerita pendek yang mengeksplorasi cara manusia berpikir tentang uang, menunjukkan bahwa kesuksesan finansial lebih ditentukan oleh perilaku dan emosi dibandingkan kepintaran matematis.', 90000.00, 18, 'books/l2WePYQD0NICcmhlhohtGWrSbeLxbzeq47c98LNI.jpg', '2026-11-15 02:29:23', '2026-11-15 04:19:57'),
(7, 6, 7, 'Sapiens: Riwayat Singkat Umat Manusia', '9786024244163', 'Penelusuran komprehensif sejarah evolusi manusia Homo sapiens dari zaman batu hingga era modern, membedah bagaimana revolusi kognitif, pertanian, dan sains membentuk peradaban dunia.', 125000.00, 25, 'books/EjNaq94nLFGycOTLOyBRzVQCKtTz598kwMFSM3NC.jpg', '2026-11-15 02:31:50', '2026-11-15 06:31:46'),
(8, 7, 8, 'Habibie & Ainun', '9789791255134', 'Memoar personal Presiden ke-3 RI yang menuturkan perjalanan cinta, pengabdian, suka duka meniti karier di Jerman hingga memimpin Indonesia bersama mendiang istrinya, Hasri Ainun Besari.', 85000.00, 10, 'books/Pcl3cdnBsihHQOG7mcaFuRbWCsBS557jRukTrJjG.jpg', '2026-11-15 02:33:14', '2026-11-15 02:33:14'),
(9, 8, 9, 'Atomic Habits', '9786020633176', 'Panduan praktis berbasis sains psikologi dan neurosains tentang cara membangun kebiasaan baik yang bertahan lama serta menghilangkan kebiasaan buruk melalui perubahan kecil sebesar 1% setiap hari.', 118000.00, 27, 'books/Qys2GxStEeyyy6O5RJa09HB6K31k0p222A2GHqjV.jpg', '2026-11-15 02:34:46', '2026-11-15 08:01:17'),
(10, 11, 15, 'Dilan: Dia adalah Dilanku Tahun 1990', '9786027870413', 'Kisah cinta remaja berlatar Kota Bandung tahun 1990 antara Milea, siswi pindahan dari Jakarta, dengan Dilan, anggota geng motor yang cerdas dan memiliki cara pendekatan unik serta puitis.', 99000.00, 20, 'books/IAVNhnhrVzVVVb44SPrVG5nO8viAmhh64XHrSGDS.jpg', '2026-11-15 02:37:15', '2026-11-15 02:37:15'),
(11, 10, 11, 'Bumi', '9786020332956', 'Kisah petualangan Raib, gadis remaja berusia 15 tahun yang memiliki kemampuan menghilang, bersama dua sahabatnya Seli dan Ali menjelajahi dunia paralel berteknologi canggih seperti Klan Bulan, Matahari, dan Bintang.', 90000.00, 89, 'books/UrtAmkcxNQ799JlfGpVFwNrzDMGfDJzMAXQkV6lg.jpg', '2026-11-15 02:39:31', '2026-11-15 03:35:30'),
(12, 9, 10, 'Laut Bercerita', '9786024246945', 'Novel berlatar era pergerakan mahasiswa tahun 1998 yang mengikuti kisah Biru Laut dan kawan-kawan aktivisnya yang diculik, serta perjuangan keluarga yang ditinggalkan untuk mencari kejelasan nasib mereka.', 115000.00, 96, 'books/0ITMuBkB0aztqWjGBUrD471fC0j7pq7g0SEXDnWY.jpg', '2026-11-15 02:40:50', '2026-11-15 04:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Customer', 'customer@gmail.com', 'Cara Pembayaran', 'cara bayar nya gimana?', '2026-11-15 05:20:34', '2026-11-15 05:20:34'),
(2, 'Karina', 'customer@gmail.com', 'Buku', 'apakah buku laskar pelangi tidak ada stok?', '2026-11-15 06:54:22', '2026-11-15 06:54:22'),
(3, 'Karina', 'customer@gmail.com', 'Pembayaran', 'apakah tidak bisa cod?', '2026-11-15 07:30:22', '2026-11-15 07:30:22'),
(4, 'Rere', 'customer@gmail.com', 'Test Kontak', 'hanya test modal bootstrap', '2026-11-15 07:44:45', '2026-11-15 07:44:45'),
(5, 'Aurielle', 'aura@gmail.com', 'Pembayaran', 'bagaimana cara melakukan pembayaran lebih lanjut?', '2026-11-15 08:06:59', '2026-11-15 08:06:59');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Kesehatan & Kebugaran', 'Genre non fiksi seputar informasi nutrisi, olahraga, dan hidup sehat', '2026-11-13 01:24:39', '2026-11-15 01:45:52'),
(5, 'Sains & Teknologi', 'Genre non fiksi yang menjelaskan tentang alam, biologi, astronomi atau ilmu pasti', '2026-11-15 01:36:05', '2026-11-15 01:46:40'),
(6, 'Bisnis & Keuangan', 'Genre non fiksi tentang panduan mengelola bisnis, karier, atau keuangan pribadi', '2026-11-15 01:47:16', '2026-11-15 01:47:16'),
(7, 'Sejarah', 'Genre non fiksi yang membahas peristiwa nyata di masa lalu', '2026-11-15 01:47:49', '2026-11-15 01:47:49'),
(8, 'Biografi & Autobiografi', 'Genre non fiksi yang menceritakan kisah hidup seseorang.', '2026-11-15 01:49:03', '2026-11-15 01:49:03'),
(9, 'Pengembangan Diri', 'Genre yang berfokus pada peningkatan produktivitas, kebiasaan positif, dan kesehatan mental', '2026-11-15 01:49:35', '2026-11-15 01:49:35'),
(10, 'Fiksi Sejarah', 'Genre fiksi tentang cerita yang berlatar belakang peristiwa atau era sejarah nyata.', '2026-11-15 01:50:29', '2026-11-15 01:50:29'),
(11, 'Fiksi Ilmiah', 'Genre fiksi yang menggabungkan unsur ilmu pengetahuan, teknologi masa depan, robot, atau penjelajahan luar angkasa.', '2026-11-15 01:51:00', '2026-11-15 01:51:00'),
(12, 'Misteri & Detektif', 'Genre yang berfokus pada pemecahan suatu teka-teki, kejahatan, atau kasus.', '2026-11-15 01:52:51', '2026-11-15 01:53:35'),
(13, 'Thriller & Suspense', 'Genre yang penuh ketegangan, aksi, dan bahaya yang membuat pembaca penasaran.', '2026-11-15 01:53:19', '2026-11-15 01:54:18'),
(14, 'Horor', 'Genre yang dirancang untuk membangkitkan rasa takut, teror, atau fenomena supranatural.', '2026-11-15 01:54:45', '2026-11-15 01:54:45'),
(15, 'Romantis', 'Genre yang berpusat pada hubungan dan kisah cinta antartokoh.', '2026-11-15 01:55:12', '2026-11-15 01:55:12'),
(16, 'Fantasi', 'Berlatar di dunia imajinatif yang melibatkan keajaiban, sihir, atau makhluk mitologi.', '2026-11-15 01:55:39', '2026-11-15 01:55:39');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_11_13_060905_create_authors_table', 2),
(5, '2026_11_13_061111_create_genres_table', 2),
(6, '2026_11_13_061200_create_books_table', 2),
(7, '2026_11_13_061243_create_cart_items_table', 2),
(8, '2026_11_13_061318_create_transactions_table', 2),
(9, '2026_11_13_061412_create_transaction_items_table', 2),
(10, '2026_11_13_061547_add_profile_and_role_columns_to_users_table', 2),
(11, '2026_11_13_071244_create_personal_access_tokens_table', 3),
(12, '2026_11_13_140555_add_profile_photo_to_users_table', 4),
(13, '2026_11_15_120000_create_contact_messages_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '993b9043947a13fdb6720d174659ccd6e107f1938aea45980fd02e5c15b04915', '[\"*\"]', NULL, NULL, '2026-11-13 01:01:04', '2026-11-13 01:01:04'),
(2, 'App\\Models\\User', 1, 'auth_token', '70b99ebf76185a34354a41964afcdd1aba335b367fdbcbffea1fe1039f4b47bf', '[\"*\"]', NULL, NULL, '2026-11-13 01:03:08', '2026-11-13 01:03:08'),
(4, 'App\\Models\\User', 2, 'auth_token', '3236ceea323e687022b49d3d08b2b8bbe1dffc4faf0c6604c88150a3d7449ae0', '[\"*\"]', '2026-11-14 09:00:24', NULL, '2026-11-13 01:22:54', '2026-11-14 09:00:24'),
(6, 'App\\Models\\User', 1, 'auth_token', 'e8e7ec9f3066f591914c3bbafed54882988d08c4fda6bc45caabf72918ccea27', '[\"*\"]', '2026-11-13 02:58:33', NULL, '2026-11-13 02:56:09', '2026-11-13 02:58:33'),
(7, 'App\\Models\\User', 2, 'auth_token', 'ceccd4fa44f1858e9c60f7d74deddb4235193557c8d1a2be9b28febedf08139d', '[\"*\"]', '2026-11-13 03:29:30', NULL, '2026-11-13 03:10:15', '2026-11-13 03:29:30'),
(8, 'App\\Models\\User', 1, 'auth_token', '1cd796fd5b60a665cf249b9b3ab5998b39845dcbf738a52841557c0a5aeb8bb0', '[\"*\"]', '2026-11-13 07:23:01', NULL, '2026-11-13 06:52:39', '2026-11-13 07:23:01'),
(9, 'App\\Models\\User', 3, 'auth_token', '80a522d878a5821a5863366ec7b94b51f0fc6685689f35fcfd5ca27e68712bc2', '[\"*\"]', '2026-11-13 07:27:10', NULL, '2026-11-13 07:25:47', '2026-11-13 07:27:10'),
(10, 'App\\Models\\User', 3, 'auth_token', '6eaaf1f0f3f3375d99e63f9696f7c25d773c7646892279f3cfcb0081a8135662', '[\"*\"]', '2026-11-13 09:22:47', NULL, '2026-11-13 07:27:37', '2026-11-13 09:22:47'),
(11, 'App\\Models\\User', 1, 'auth_token', '70d51a7676229df958162c0d120898413b32106bb3aba300c08eef6256c87be2', '[\"*\"]', '2026-11-14 05:22:54', NULL, '2026-11-14 04:49:52', '2026-11-14 05:22:54'),
(14, 'App\\Models\\User', 2, 'auth_token', 'e855009365472a367a560e784dc810401100a293cc7174b95de359d2143a640c', '[\"*\"]', '2026-11-14 05:47:02', NULL, '2026-11-14 05:46:42', '2026-11-14 05:47:02'),
(17, 'App\\Models\\User', 2, 'auth_token', 'da049d1a529c262217ef06ce2329715be9db3745512d82f9ebedb1b2635e5964', '[\"*\"]', '2026-11-14 06:22:02', NULL, '2026-11-14 06:21:35', '2026-11-14 06:22:02'),
(18, 'App\\Models\\User', 1, 'auth_token', 'f7b89543e087db5941f45803cee134ad5d1c6b9817e3fb9f1b8453b2d0768eea', '[\"*\"]', '2026-11-14 06:45:22', NULL, '2026-11-14 06:23:24', '2026-11-14 06:45:22'),
(20, 'App\\Models\\User', 1, 'auth_token', '21730f133a68c7d8a4452f913a76b92c852528db0ec07db5cd96c005c94fb372', '[\"*\"]', '2026-11-14 06:46:25', NULL, '2026-11-14 06:46:12', '2026-11-14 06:46:25'),
(22, 'App\\Models\\User', 2, 'auth_token', '04ea45e72019c8bb075ffcaa6ad22ee4a6bd59e37828425f2aacf54b2d536a44', '[\"*\"]', '2026-11-14 08:59:45', NULL, '2026-11-14 07:04:41', '2026-11-14 08:59:45'),
(23, 'App\\Models\\User', 1, 'auth_token', '963f701ba0b03d959edd398ac8c91dbe5045f6040db65c207707089acfc8e75e', '[\"*\"]', '2026-11-14 08:41:21', NULL, '2026-11-14 08:41:02', '2026-11-14 08:41:21'),
(26, 'App\\Models\\User', 1, 'auth_token', '5f179160c4d96b1ca331ced914e6876f69cc72b13d28632d437b469ef7ee8e98', '[\"*\"]', '2026-11-14 10:01:27', NULL, '2026-11-14 09:49:03', '2026-11-14 10:01:27'),
(27, 'App\\Models\\User', 4, 'auth_token', 'bfa459c3b67efd5bed3d4a7ac115210d7ddd756d16fd613df6c893591b8739a2', '[\"*\"]', '2026-11-14 10:21:47', NULL, '2026-11-14 10:02:08', '2026-11-14 10:21:47'),
(31, 'App\\Models\\User', 1, 'auth_token', '9a076cb97a9859bbda670c5f938c692b3deeaa52b6f1e000a7f622354e48eaa2', '[\"*\"]', '2026-11-15 03:36:17', NULL, '2026-11-15 03:33:16', '2026-11-15 03:36:17'),
(33, 'App\\Models\\User', 1, 'auth_token', '3414968910960c62eb3ac5509eebbbb1719edd0a65fb8aaddd6df3aca4fc420d', '[\"*\"]', '2026-11-15 03:45:46', NULL, '2026-11-15 03:37:24', '2026-11-15 03:45:46'),
(35, 'App\\Models\\User', 1, 'auth_token', 'acd7a1c92026fe0fdfae2fab12d90ff2716679edba05d79cd4a8beaae730e71f', '[\"*\"]', '2026-11-15 05:02:35', NULL, '2026-11-15 03:55:15', '2026-11-15 05:02:35'),
(36, 'App\\Models\\User', 1, 'auth_token', '0c70e325d0c3e3bbd0c21308c84f408dd78a8d4ef4fc23cc33b8687f8c6667cd', '[\"*\"]', '2026-11-15 04:22:15', NULL, '2026-11-15 04:22:01', '2026-11-15 04:22:15'),
(38, 'App\\Models\\User', 1, 'auth_token', '2b649284c672837659601b3b0fc08495479793bd5c1f0e16154b8862505ba043', '[\"*\"]', '2026-11-15 05:20:42', NULL, '2026-11-15 05:04:20', '2026-11-15 05:20:42'),
(40, 'App\\Models\\User', 1, 'auth_token', 'a967ee9b9b11b68d20bbf8a5fb5938f40e5c018060b2649becb4cae587ada68a', '[\"*\"]', '2026-11-15 06:30:13', NULL, '2026-11-15 05:52:29', '2026-11-15 06:30:13'),
(43, 'App\\Models\\User', 1, 'auth_token', '01d366bd92a17833b049a54b86bdc561ebf8d49551f426828d5a9b8423544e6c', '[\"*\"]', '2026-11-15 06:50:12', NULL, '2026-11-15 06:47:46', '2026-11-15 06:50:12'),
(44, 'App\\Models\\User', 1, 'auth_token', 'd849bbbe6f910d6a98cde7bed2815c7a7df5b5e93d4a788789e4b2007563a8f0', '[\"*\"]', '2026-11-15 07:29:26', NULL, '2026-11-15 06:50:52', '2026-11-15 07:29:26'),
(45, 'App\\Models\\User', 1, 'auth_token', '4affe3083d470f3016e8904f0a07f11f1cdcf5b0865fcb67647f305726177c77', '[\"*\"]', '2026-11-15 07:32:26', NULL, '2026-11-15 07:29:31', '2026-11-15 07:32:26'),
(47, 'App\\Models\\User', 1, 'auth_token', '4e28feeebe03a90b32a6cd1716a16030d650c1cf6c6968f48c6b1668429c7937', '[\"*\"]', '2026-11-15 07:50:39', NULL, '2026-11-15 07:34:52', '2026-11-15 07:50:39'),
(48, 'App\\Models\\User', 1, 'auth_token', '60f09a19363d38f9556713c26b32b68e6b786b5c7ab36b3b289aa0fc0bf87c95', '[\"*\"]', NULL, NULL, '2026-11-15 07:50:49', '2026-11-15 07:50:49'),
(50, 'App\\Models\\User', 1, 'auth_token', '3323fcde6555f204cff75e5c5a4cdbcbf919ec26747e363c0bd7ab842190e170', '[\"*\"]', NULL, NULL, '2026-11-15 07:53:26', '2026-11-15 07:53:26'),
(52, 'App\\Models\\User', 5, 'auth_token', 'ff5623eb5dc98452fb7d8751ca9803ab4cec6c8cebdf8d5ff093ed32e49103f2', '[\"*\"]', '2026-11-15 08:05:53', NULL, '2026-11-15 07:54:33', '2026-11-15 08:05:53');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1HiEhbvUyuxu1gT9MEXKIm8GQNaHocVk68UpyRx2', NULL, '127.0.0.1', 'PostmanRuntime/2.16.2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekxqS3VkNUJjckJac1FEUllTUFh2dXJQS29mY3JMRFlTZkp3VHFyRiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794670847),
('cjBW2nVaGUVIO45MBG9QcWgqTxOm3KaENUlSHFqn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVjNadzN2SWs0QWdIaTFscjFqQUlVZkN3dXlDeDhWUW5zd2pFbUVaSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794555711),
('lmu5RTXEenJoHky37ViHCaRdYMYPPKYgzxLIZWF5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVc4TG9lZ1M5YVROYUdFeVlGaHVHSGZSVGZveEZnREhKV0RGZDZCViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794755723),
('OBk6rsWi59Jv47opnH9wQeYpWOvbBy3dbYo6Kf4H', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlpXMFl1ZzVKb2VQT3QxZlMzUjB6RFowWkNFWHlxTTBaYkdxTTBIaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794731089),
('ul9BeOmGAVrrTYhv5vUNaITcAV1Szel8aRuw6dna', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMEdDWUpIdUE4MHdWQ1l1a2VvVnVBblphZzAxeDh5eXBJcXRZNnhTNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794656897),
('y5042Nn6YyZ8KHfMM1r0CAs0r0keC33bYQ9Rd1RL', NULL, '127.0.0.1', 'PostmanRuntime/2.15.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQXVRZlhEOHQxVDEwazU1Uzgza3dNME9PWFE1TUlGcnBIWUt0aWUzTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1794558683);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `shipping_address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `shipping_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL,
  `order_status` enum('pending','processing','shipped','completed','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed','expired') NOT NULL DEFAULT 'pending',
  `payment_method` varchar(30) NOT NULL DEFAULT 'midtrans',
  `midtrans_transaction_id` varchar(100) DEFAULT NULL,
  `snap_token` varchar(255) DEFAULT NULL,
  `payment_url` text DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `order_number`, `recipient_name`, `phone`, `shipping_address`, `city`, `province`, `postal_code`, `subtotal`, `shipping_cost`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `midtrans_transaction_id`, `snap_token`, `payment_url`, `paid_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'BS-XMBGPUGBUC', 'Customer Test', '081234567890', 'Jl. Melati No. 10', 'Bogor', 'Jawa Barat', '16111', 255000.00, 0.00, 255000.00, 'shipped', 'pending', 'midtrans', NULL, NULL, NULL, NULL, '2026-11-13 01:40:32', '2026-11-14 09:11:20'),
(2, 1, 'BS-WHRJAWQULM', 'Customer Test', '081234567890', 'Jl. Melati No. 10', 'Bogor', 'Jawa Barat', '16111', 85000.00, 0.00, 85000.00, 'completed', 'paid', 'midtrans', 'TEST-MIDTRANS-001', '307e1878-9782-4aba-9a8f-5366bb3b3719', 'https://app.sandbox.midtrans.com/snap/v4/redirection/307e1878-9782-4aba-9a8f-5366bb3b3719', '2026-11-13 03:28:29', '2026-11-13 02:58:33', '2026-11-14 09:09:38'),
(3, 3, 'BS-MENLYWZVMX', 'Karina Cantik', '081234567890', 'Jl. Melati No. 10', 'Bogor', 'Jawa Barat', '16111', 170000.00, 0.00, 170000.00, 'pending', 'pending', 'midtrans', NULL, '10456549-a725-47fa-a403-b1a196b618d0', 'https://app.sandbox.midtrans.com/snap/v4/redirection/10456549-a725-47fa-a403-b1a196b618d0', NULL, '2026-11-13 07:43:50', '2026-11-13 07:43:50'),
(4, 1, 'BS-JKJVQEDSTZ', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 90000.00, 0.00, 90000.00, 'processing', 'pending', 'midtrans', NULL, 'd18ba652-5977-471c-a682-789e4cbb39a6', 'https://app.sandbox.midtrans.com/snap/v4/redirection/d18ba652-5977-471c-a682-789e4cbb39a6', NULL, '2026-11-15 03:35:30', '2026-11-15 03:36:58'),
(5, 1, 'BS-B62KRA9PYS', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 345000.00, 0.00, 345000.00, 'pending', 'pending', 'midtrans', NULL, '63e7cacd-9312-4a2a-8784-b1a6348e88e6', 'https://app.sandbox.midtrans.com/snap/v4/redirection/63e7cacd-9312-4a2a-8784-b1a6348e88e6', NULL, '2026-11-15 03:39:21', '2026-11-15 03:39:22'),
(6, 1, 'BS-RTKXP1LBFX', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 220000.00, 0.00, 220000.00, 'pending', 'pending', 'midtrans', NULL, '76dc8a8c-5cfc-408b-a797-469abffe03ae', 'https://app.sandbox.midtrans.com/snap/v4/redirection/76dc8a8c-5cfc-408b-a797-469abffe03ae', NULL, '2026-11-15 04:00:53', '2026-11-15 04:00:53'),
(7, 1, 'BS-VSPFSILTK4', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 90000.00, 0.00, 90000.00, 'pending', 'pending', 'midtrans', NULL, '2affabd2-a0ec-4ec3-bffd-f059285e4300', 'https://app.sandbox.midtrans.com/snap/v4/redirection/2affabd2-a0ec-4ec3-bffd-f059285e4300', NULL, '2026-11-15 04:15:25', '2026-11-15 04:15:26'),
(8, 1, 'BS-NB7YGZSNOK', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 115000.00, 0.00, 115000.00, 'pending', 'pending', 'midtrans', NULL, '27c5f2c2-2c7e-4a84-916a-65e742be4a45', 'https://app.sandbox.midtrans.com/snap/v4/redirection/27c5f2c2-2c7e-4a84-916a-65e742be4a45', NULL, '2026-11-15 04:19:12', '2026-11-15 04:19:13'),
(9, 1, 'BS-SSBJRNRUDH', 'Customer', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 90000.00, 0.00, 90000.00, 'shipped', 'paid', 'midtrans', NULL, '2df25db6-494e-4d59-97d3-40fc23b71a97', 'https://app.sandbox.midtrans.com/snap/v4/redirection/2df25db6-494e-4d59-97d3-40fc23b71a97', '2026-11-15 05:03:28', '2026-11-15 04:19:57', '2026-11-15 05:03:43'),
(10, 1, 'BS-0XK72V531N', 'Karina', '089512345678', 'Jl. Melati No. 18', 'Kabupaten Bogor', 'Jawa Barat', '16111', 118000.00, 0.00, 118000.00, 'pending', 'paid', 'midtrans', NULL, '44488289-18d4-441a-b127-8bc124eb48ef', 'https://app.sandbox.midtrans.com/snap/v4/redirection/44488289-18d4-441a-b127-8bc124eb48ef', '2026-11-15 07:34:39', '2026-11-15 07:30:46', '2026-11-15 07:34:39'),
(11, 1, 'BS-FGZ3JZSHI1', 'Karina', '089512345678', 'Jl. Melati No. 18 RT01 RW01', 'Kabupaten Bogor', 'Jawa Barat', '16111', 118000.00, 0.00, 118000.00, 'pending', 'pending', 'midtrans', NULL, 'd52ef6a3-0dfe-4aaf-90e0-c9a9e1b09d88', 'https://app.sandbox.midtrans.com/snap/v4/redirection/d52ef6a3-0dfe-4aaf-90e0-c9a9e1b09d88', NULL, '2026-11-15 07:45:23', '2026-11-15 07:45:23'),
(12, 5, 'BS-NCDDASU56O', 'Aurielle', '081234567890', 'Dramaga Manggis No.10', 'Bogor', 'Jawa Barat', '16680', 118000.00, 0.00, 118000.00, 'completed', 'paid', 'midtrans', NULL, '4fbf708d-9206-446a-9dda-41d0d19cdf6a', 'https://app.sandbox.midtrans.com/snap/v4/redirection/4fbf708d-9206-446a-9dda-41d0d19cdf6a', '2026-11-15 08:04:46', '2026-11-15 08:01:17', '2026-11-15 08:12:08');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`id`, `transaction_id`, `book_id`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 3, 85000.00, 255000.00, '2026-11-13 01:40:32', '2026-11-13 01:40:32'),
(2, 2, 2, 1, 85000.00, 85000.00, '2026-11-13 02:58:33', '2026-11-13 02:58:33'),
(3, 3, 2, 2, 85000.00, 170000.00, '2026-11-13 07:43:50', '2026-11-13 07:43:50'),
(4, 4, 11, 1, 90000.00, 90000.00, '2026-11-15 03:35:30', '2026-11-15 03:35:30'),
(5, 5, 12, 3, 115000.00, 345000.00, '2026-11-15 03:39:21', '2026-11-15 03:39:21'),
(6, 6, 2, 2, 110000.00, 220000.00, '2026-11-15 04:00:53', '2026-11-15 04:00:53'),
(7, 7, 6, 1, 90000.00, 90000.00, '2026-11-15 04:15:25', '2026-11-15 04:15:25'),
(8, 8, 12, 1, 115000.00, 115000.00, '2026-11-15 04:19:12', '2026-11-15 04:19:12'),
(9, 9, 6, 1, 90000.00, 90000.00, '2026-11-15 04:19:57', '2026-11-15 04:19:57'),
(10, 10, 9, 1, 118000.00, 118000.00, '2026-11-15 07:30:46', '2026-11-15 07:30:46'),
(11, 11, 9, 1, 118000.00, 118000.00, '2026-11-15 07:45:23', '2026-11-15 07:45:23'),
(12, 12, 9, 1, 118000.00, 118000.00, '2026-11-15 08:01:17', '2026-11-15 08:01:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `phone`, `address`, `city`, `province`, `postal_code`, `profile_photo`) VALUES
(1, 'Karina', 'customer@gmail.com', NULL, '$2y$12$XJ/WHDv4YT7u9tK3cC/G3.eqsxuvbpg9bjAE/oEjbotwL5Jmye2.C', NULL, '2026-11-13 01:01:04', '2026-11-15 07:46:40', 'customer', '0895123456789', 'Jl. Melati No. 18 RT01 RW01', 'Kabupaten Bogor', 'Jawa Barat', '16111', 'profile-photos/nmsSgtPRMeqmTmUpMjcVhv4uZK2RFdxjv0LGDUTs.jpg'),
(2, 'Admin BookStore', 'admin@bookstore.com', NULL, '$2y$12$ZChm8rBcO1BXHkSSL5iXSuQwj5KLj6XTBUTZqyMbWjMGGq31M0K9i', NULL, '2026-11-13 01:21:16', '2026-11-13 01:21:16', 'admin', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Karina Cantik', 'karina@gmail.com', NULL, '$2y$12$I1gQiRmW2vNsKzXcRMYLXe98KEHGMomPfYRif6fMmfO5p/m8u6.1S', NULL, '2026-11-13 07:25:47', '2026-11-13 07:27:08', 'customer', '081234567890', 'Jl. Melati No. 10', 'Bogor', 'Jawa Barat', '16111', 'profile-photos/Jd2vUPd2lezo1FYtKFrjn5rp0nSbcNX7WZQWCMI6.jpg'),
(5, 'Aurielle', 'aura@gmail.com', NULL, '$2y$12$uMctw9a4M6OQiJKNvdKH8uhGho0eE0qUKkD.BovIzaNqVsfLRFYbC', NULL, '2026-11-15 07:54:33', '2026-11-15 07:56:22', 'customer', '081234567890', 'Dramaga Manggis No.10', 'Bogor', 'Jawa Barat', '16680', 'profile-photos/GzHpg2ej3zH0uY4O5tCrLP3yz466h2q5EkO6hnXE.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_isbn_unique` (`isbn`),
  ADD KEY `books_author_id_foreign` (`author_id`),
  ADD KEY `books_genre_id_foreign` (`genre_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_user_id_foreign` (`user_id`),
  ADD KEY `cart_items_book_id_foreign` (`book_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `genres_name_unique` (`name`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_order_number_unique` (`order_number`),
  ADD KEY `transactions_user_id_foreign` (`user_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_items_transaction_id_foreign` (`transaction_id`),
  ADD KEY `transaction_items_book_id_foreign` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `books_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `transaction_items_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
