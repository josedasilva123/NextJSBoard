import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import SignInButton from '../SignInButton';

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
                    <Link href="/donate">
                        <a>Seja VIP</a>
                    </Link>
                </nav>               
                
                <SignInButton />
            </div>
        </header>
    )    
}

export default Header
