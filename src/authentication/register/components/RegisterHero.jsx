import { PlayCircleOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

function RegisterHero() {
  return (
    <div className="register-hero">
      <div className="register-hero-image" />
      <div className="register-hero-gradient" />

      <div className="register-hero-content">
        <div className="register-hero-icon-box">
          <PlayCircleOutlined className="register-hero-icon" />
        </div>
        <div>
          <h1 className="register-hero-title">
            Connect deeply.
            <br />
            Stream freely.
          </h1>
          <p className="register-hero-text">
            Join the world&apos;s most vibrant community for real-time video sharing. Experience ultra-low
            latency and crystal clear quality designed for creators.
          </p>
        </div>

        <div className="register-hero-meta">
          <div className="register-hero-avatars">
            <Avatar
              size={40}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACEx2AgUW6MpYkW9jJlwq2BOqk3SmMYmOR953GzdMyXNDksKE9_lo--9ePQC3udtJRG7ITZAru5ms8ATTaIjkJZ1Lw8VR4cWpmktBnKNFnvJEwsE_K2VSDJ-D5siSWJeKxO3NVliXXqx0xQDoycF4nLP2N2j-Wlrkg4VIBmndcAyfhGjaavAmj0Vm1yMVUWbeMzpeEj63FicTSmXY4O3zpahjrcVHWqlbiGNi_C6iOQB17XKDAzwpLOL42E35Tf2HnOv0XVGD851k"
              alt="Creator avatar 1"
            />
            <Avatar
              size={40}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABGrwLjliQHFiY3afRMnXE-n4jvusL_uhf8Owr4ZpzqZX0qiMmPtFFn1KwsOylaJwOM0SaBpDRRjFbDoKy4pQ0XwL74BloL00vcQSBdCPNPG_TYuSN77sqKB0NyaezRVwCilms6NlWd5yjF8RZUikcqN3TOg-gm1nxOZSt9_vkRwMUvN1sNYu2gqke6WYU3bGN0Ql-5xLrb6WKbU_oaIXXK82YDJssayWINv9zLYBUa5hw8-u8bc5dMRLvSQAYMKoR2qEj2-1wP38"
              alt="Creator avatar 2"
            />
            <Avatar
              size={40}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNN8f4Sgy81lxtU6BR0xRmusNaEXmAi2VbmuWGzja3dSb8VrH30u2WZxkJMdk8xB-nms6hfi1qT5bJJXHl86bM4aeK7ukudTdqCU0mW0_Se_rzqL5fWoycEH8zReHSWKCb_hl8JpFREOSLruxit9k7m93wF3H0vFNp-NyxEiSmdeXiv0B__XYvQuJ6wFh423xrJo1uXbr1PoQbdgfKsg2Gop6qqR3xUZu8KIYvXV67wbTVRfFPIiuTAmUkDNicLdPUg2s5us5sIG4"
              alt="Creator avatar 3"
            />
            <div className="register-hero-more">+2k</div>
          </div>
          <div className="register-hero-meta-text">Creators joined today</div>
        </div>
      </div>
    </div>
  )
}

export default RegisterHero
