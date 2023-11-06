import React, { useEffect, useState } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import styles from '../src/index.module.css'
import Status from './Status';

//ENTER YOUR API KEY HERE. FROM WEATHERAPI
const API_KEY = ""

const App = () => {
  
  const [place, setplace] = useState("")
  const [temperature, settemperature] = useState('')
  const [humidity, sethumidity] = useState('')
  const [pressure, setpressure] = useState('')
  const [name, setname] = useState('')
  const [country, setcountry] = useState('')
  const [weathermain, setweathermain] = useState('')
  const [windSpeed, setwindSpeed] = useState('')
  const [apiLocation, setapiLocation] = useState("Patna")
  const [imageId, setimageId] = useState('01d')
  const [todaydate, settodaydate] = useState('')
  const [todaymonth, setTodaymonth] = useState('')
  const [todayYear, setTodayYear] = useState('')
  const [todayday, settodayday] = useState('')
  let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${apiLocation}&units=metric&appid=${API_KEY}`
  
  const handleChange=(e)=>{
    setplace(e.target.value)
    
  }

  const handleClick = (e)=>{
    
    if(place != ""){
      setapiLocation(place)
      
      makeApicall();
    }
    else{
      alert("Please enter a place")
    }
  }

  const makeApicall = async () => {
    const res = await fetch(BASE_URL)
    const resdata =await res.json()


    
    settemperature(resdata.main.temp);
    sethumidity(resdata.main.humidity);
    setpressure(resdata.main.pressure);
    setname(resdata.name);
    setweathermain(resdata.weather[0].main);
    setwindSpeed(resdata.wind.speed)
    setcountry(resdata.sys.country)
    setimageId(resdata.weather[0].icon)
    
  }
  useEffect(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const today = new Date();
    const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, and so on
    const currentDayName = daysOfWeek[currentDay];
    
    const currentMonth = today.getMonth();
    const currentMonthName = months[currentMonth];
    
    const currentYear = today.getFullYear();
    
    const currentDate = today.getDate();
settodaydate(currentDayName)
setTodaymonth(currentMonthName)
setTodayYear(currentYear)
settodayday(currentDate)
   makeApicall()
  }, [])
  

  return (
    <div className={styles.container}>
      <div className={styles.weatherside}>
        <div className={styles.weathergradient}></div>
        <div className={styles.datecontainer}>
          <h2 className={styles.datedayname}>{todaydate}</h2>
          <span className={styles.dataday}>{todayday} {todaymonth} {todayYear}</span>
          <LocationOnOutlinedIcon />
          <span className={styles.location}>{name},{country}</span>
        </div>
        <div className={styles.weathercontainer}>
        <img src={`https://openweathermap.org/img/wn/${imageId}@2x.png`} alt="" srcset="" />

          <h1 className={styles.weathertemp}>{temperature}°C</h1>
          <h3 className={styles.weatherdesc}>{weathermain}</h3>
        </div>
      </div>
      <div className={styles.infoside}>
        <div className={styles.todayinfocontainer}>
          <div className={styles.todayinfo}>
            <div className={styles.precipitation}>
              <span className={styles.title}>PRESSURE</span>
              <span className={styles.value}>{pressure} %</span>
              <div className={styles.clear}></div>
            </div>
            <div className={styles.humidity}>
              <span className={styles.title}>HUMIDIY</span>
              <span className={styles.value}>{humidity} %</span>
              <div className={styles.clear}></div>
            </div>
            <div className={styles.wind}>
              <span className={styles.title}>WIND</span>
              <span className={styles.value}>{windSpeed} km/hr</span>
              <div className={styles.clear}></div>
            </div>
          </div>
        </div>
        <div className={styles.weekcontainer}>
          {/* Impiment the animation */}
          <Status/>
        </div>
        <div className={styles.locationcontainer}>
          <form  onChange={handleChange}>
            <input  type="text" id="search" name="q" placeholder="Enter your location"value={place} />

          </form>
          <button className={styles.locationbutton} onClick={handleClick}>
            <LocationOnOutlinedIcon />
            <span>change location</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App