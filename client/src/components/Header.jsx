import '../static/css/Header.css';
// import { Switch } from '@mui/material';
// import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TelegramIcon from '@mui/icons-material/Telegram';

const Header = ({ lightMode, setlightMode }) => {


    return (
        <div className='header'>
            <div className='header-logo'>
                <img src="https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png"></img>
                <p>Powered By<span> Finstreet</span></p>
            </div>
            <div className='header-btns'>
                <button className='header-btn' style={{
                    backgroundColor: lightMode ? '#f8f9fa' : '#2e3241',
                    color: lightMode ? '#2e3241' : '#fff',
                    transition: "all .5s"
                }}>INR<ArrowDropDownIcon /></button>

                <button className='header-btn' style={{
                    backgroundColor: lightMode ? '#f8f9fa' : '#2e3241',
                    color: lightMode ? '#2e3241' : '#fff',
                    transition: "all .5s"
                }}>BTC<ArrowDropDownIcon /></button>

                <button className='header-btn' style={{
                    backgroundColor: lightMode ? '#f8f9fa' : '#2e3241',
                    color: lightMode ? '#2e3241' : '#fff',
                    transition: "all .5s",
                    minWidth: '86px'
                }}>BUY BTC</button>


            </div>
            <div className='header-right'>
                <div className='progress-bar'>60</div>
                <div className='telegram-btn'>
                    <button className='telegram'><TelegramIcon /> Connect Telegram</button>
                </div>
                <div className='toggle-theme'>
                    <div className="switch">
                        <input type="checkbox" id="check" />
                        <label htmlFor="check" onClick={() => setlightMode(!lightMode)} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header