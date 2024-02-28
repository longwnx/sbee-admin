import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { env } from '@/config'
import { AppProvider } from '@/providers'
import '@/styles/globals.scss'

library.add(fas, fab, far)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alphonso',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.APP_GA4}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.APP_GA4}');
        `}
        </Script>
        <Script async type="text/javascript" src="/js/newrelic.js" />
        <Script id="google-tags" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${env.APP_GTM}');
        `}
        </Script>
      </head>
      <body className={inter.variable}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.APP_GTM}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
