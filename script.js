'use strict';

//geolocation:位置情報の取得に成功したときに呼び出されるファンクション
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
  //ajaxRequest(34.139718, 131.476339); //特定の緯度、経度指定でも表示可能
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード：’+ error.coce');
}

navigator.geolocation.getCurrentPosition(success, fail);

//UTC をミリ秒にする。dateオブジェクトを初期化するときにミリ秒じゃないといけない。utcは秒になってる。
function utcToJSTime(utcTime) {
  return utcTime * 1000;
}

//データ取得：ajaxRequest(lat, long)には、5行目から呼び出されている
function ajaxRequest(lat, long) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = '';

  $.ajax({ //apiデータへのリクエスト
    url: url,
    data: {
      appid: appId,
      lat: lat, //緯度
      lon: long, //経度
      units: 'metric', //データの単位。めーとる報、摂氏℃のデータを取得
      lang: 'ja', //取得データの一部が日本語になる
    }
  })
    .done(function (data) { //渡されてきたdataを全部コンソールに出ている。
      console.log(data);

    //都市名、国名
    // console.log('都市名：' + data.city.name);
    // console.log('国名：' + data.city.country);
      $('#place').text(data.city.name + ', ' + data.city.country);
      
    //天気予報データ
      data.list.forEach(function (forecast, index) { //forEach＝繰り返し処理
        const dateTime = new Date(utcToJSTime(forecast.dt));
        const month = dateTime.getMonth() + 1;
        const date = dateTime.getDate();
        const hours = dateTime.getHours();
        const min = String(dateTime.getMinutes()).padStart(2, '0');
        const temperture = Math.round(forecast.main.temp); //Math.round()=()内の少数点以下を四捨五入 
        const description = forecast.weather[0].description;
        const iconPath = `images/${forecast.weather[0].icon}.svg`;
        const winddirec = forecast.wind.deg; //風関連
        const windspeed = Math.round(forecast.wind.speed);
        const windgust = Math.round(forecast.wind.gust);
        const pressure = forecast.main.pressure;
    
        // const sunrisetime = utcToJSTime(data.city.sunrise);
        // const sunrisemonth = sunrisetime.getMonth() + 1;
        // const sunrisedate = sunriseTtme.getDate();
        // const sunrisehours = sunrisetime.getHours();
        // const sunrisemin = String(sunrisetime.getMinutes()).padStart(2, '0');

        //console.logに表示する
        // console.log('日時：' + `${month}/${date} ${hours}:${min}`);
        // console.log('気温：' + temperture);
        // console.log('天気：' + description);
        // console.log('画像パス：' + iconPath);
        // console.log('風向：'+ winddirec);
        // console.log('風速：'+ `${windspeed}:${windgust}`);
        //console.log('サンライズ：' + `${sunrisemonth}/${sunrisedate} ${sunrisehours}:${sunrisemin}`);

        //現在の天気とそれ以外で出力を変える
        //現在の天気
        if (index === 0) {
          const currentWeather = `
          <div class="icon"><img src="${iconPath}"></div>
          <div class="info">
            <p>
              <span class ="description">現在の天気：${description}</span>
              <span class ="temp">${temperture}</span>℃
              <span class ="direction">${winddirec}</span>°
              <span class ="wind">${windspeed}~${windgust}</span>m/s
              <span class ="pressure">${pressure}</span>hpa

            </p>
          </div>`;
          $('#weather').html(currentWeather);
          //現在の天気以外。list0意外。
        } else {
          const tableRow = `
          <tr>
            <td class="info">
              ${month}/${date} ${hours}:${min}
            </td>
            <td class="icon"><img src="${iconPath}"></td>
            <td><span class="description">${description}</span></td>
            <td><span class="temp">${temperture}℃</span></td>
            <td><span class="direction">${winddirec}°</span></td>
            <td><span class="wind">${windspeed}~${windgust}m/s</span></td>     
            <td><span class="wind">${pressure}hpa</span></td>       
          </tr>`;
          $('#forecast').append(tableRow);
        }
        
      });

    })
    .fail(function () {
      console.log('$.ajax failed!');
  })
}