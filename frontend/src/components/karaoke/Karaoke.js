import { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Upload from '@/components/upload/Upload';
import Search from '@/components/search/Search';
import styles from './Karaoke.module.css';

export default function Karaoke() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setSelectedSong(null); // Clear search selection
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setUploadedFile(null); // Clear upload
  };

  return (
    <>
      <Head>
        <title>AnySong - Create Your Karaoke</title>
        <meta name="description" content="Upload your music or search for songs to create karaoke versions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/any-song_icon.png" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/any-song_icon.png"
                alt="AnySong Microphone Icon"
                width={55}
                height={55}
                className={styles.logoIcon}
              />
              <h1 className={styles.logoText}>AnySong</h1>
            </Link>
            <nav className={styles.nav}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </nav>
          </div>
        </div>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <h2 className={styles.mainTitle}>Create Your Karaoke</h2>
              <p className={styles.subtitle}>
                Upload your audio file or search for any song to transform it into karaoke
              </p>
            </div>

            <div className={styles.tabContainer}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'upload' ? styles.active : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  📁 Upload File
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'search' ? styles.active : ''}`}
                  onClick={() => setActiveTab('search')}
                >
                  <Image
                    src="/search_icon.png"
                    alt="Search"
                    width={16}
                    height={16}
                    className={styles.tabIcon}
                  /> Search Song
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'upload' && (
                  <Upload onFileUpload={handleFileUpload} />
                )}
                {activeTab === 'search' && (
                  <Search onSongSelect={handleSongSelect} />
                )}
              </div>
            </div>

            {(uploadedFile || selectedSong) && (
              <div className={styles.statusContainer}>
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>
                    {uploadedFile ? '📁' : '🎵'}
                  </div>
                  <div className={styles.statusInfo}>
                    <h4 className={styles.statusTitle}>Ready to Process</h4>
                    <p className={styles.statusDescription}>
                      {uploadedFile 
                        ? `File: ${uploadedFile.name}`
                        : `Song: ${selectedSong.title} by ${selectedSong.artist}`
                      }
                    </p>
                  </div>
                  <div className={styles.statusActions}>
                    <button className={styles.processButton}>
                      🎤 Start Processing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
} 