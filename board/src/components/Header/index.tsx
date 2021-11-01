import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <img src="/images/Logo.png" alt="Logo Board" />
                </Link>

                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/board">
                        <a>Meu board</a>
                    </Link>
                </nav>               
                
                <button>
                    Entrar com github
                </button>
            </div>
        </header>
    )    
}

export default Header
