import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import SignInButton from '../SignInButton';
import logo from '../../../public/images/Logo.png';

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <a>
                        <Image src={logo} alt="Logo Board" />
                    </a>
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
