"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "@/utils/cookies"

const COOKIE_NAME = "cookie_consent"

const CookieConsent = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = getCookie(COOKIE_NAME)
        if (!consent) {
            setVisible(true)
        }
    }, [])

    const acceptCookies = () => {
        setCookie(COOKIE_NAME, "accepted", 365)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div style={styles.container}>
            <p style={styles.text}>
                We use cookies to improve your experience. By continuing, you accept
                our cookie policy.
            </p>
            <button onClick={acceptCookies} style={styles.button}>
                Accept
            </button>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#111",
        color: "#fff",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
    },
    text: {
        margin: 0,
    },
    button: {
        background: "#fff",
        color: "#111",
        border: "none",
        padding: "8px 16px",
        cursor: "pointer",
        borderRadius: "4px",
    },
}

export default CookieConsent
