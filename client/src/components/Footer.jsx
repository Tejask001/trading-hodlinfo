import '../static/css/Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <ul className='footer-list' >
                    <li>Copyright © 2024</li>
                    <li>Hodlinfo.com</li>
                    <li>Developed By <span style={{ color: '#3dc6c1' }}>Tejas Kumar</span></li>
                    <li className='end'>Support</li>
                </ul>
            </div>

            <div className='footer-fixed'>
                <button className='add-btn'>Add hodlinfo to home screen</button>
            </div>
        </div>
    )
}

export default Footer