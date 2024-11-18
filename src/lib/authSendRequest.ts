export async function sendVerificationRequest(params: { identifier: string; provider: { from: string }; url: string; theme: { buttonText?: string } }) {
    const { identifier: to, provider, url, theme } = params
    const { host } = new URL(url)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: provider.from,
        to,
        subject: `Sign in to FinVue`,
        html: html({ url, host, theme }),
        text: text({ url, host }),
      }),
    })
   
    if (!res.ok)
      throw new Error("Resend error: " + JSON.stringify(await res.json()))
  }
   
  function html(params: { url: string; host: string; theme: { buttonText?: string } }) {
    const { url, theme } = params
   
    const color = {
        background: "#f9f9f9",
        text: "#444",
        buttonBackground: "#020617",
        buttonText: "#fff",
    }
   
    return `
    <body style="background-color:${color.background}">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
            <tbody>
            <tr style="width:100%">
                <td>
                <img src="https://gabrielhazout.me/FinVue-4.png" alt="FinVue Logo" width="150" height="40" style="display: block; margin: 20px 0 0px -20px; width: 150px; height: 40px; object-fit: cover;" />
                <h1 style="color:${color.text};font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:24px;font-weight:bold;margin:40px 0;padding:0">Sign in to FinVue</h1>
                <p style="color:${color.text};font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;line-height:24px;">Click the button below to sign in to your FinVue account. This link will expire in 24 hours.</p>
                <a href="${url}" style="background-color:${color.buttonBackground};color:${color.buttonText};text-decoration:none;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;display:inline-block;margin:24px 0;border-radius:4px;padding:12px 20px;">${theme.buttonText || "Sign in"}</a>
                <p style="font-size:14px;line-height:24px;margin:24px 0;color:${color.text};font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;">For security, this request was received from FinVue. If you did not request this email, you can safely ignore it.</p>
                </td>
            </tr>
            </tbody>
        </table>
    </body>
    `
}
   
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}