// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* إضافة رابط preload مع التصحيح */}
          <link
            rel="preload"
            href="/_next/static/css/app/(grid)/page.css" // تحقق من المسار الصحيح
            as="style"
            type="text/css"
            crossOrigin="anonymous" 
          />
          {/* يمكنك إضافة روابط preload إضافية هنا */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
