# 天気api

## 概要
- OpenWeather APIを使って、現在地の3時間毎、直近5日間の天気予報を表示
- https://openweathermap.org/api

## 工夫した点
- 表示項目を増やした（風向、風速（平均、ガスト）、気圧）

## 苦戦した点
- 無料で使える気象データAPIを探すこと（気象データはほぼ有料）
- UTCフォーマットの時刻を、jsのミリ秒に変換、日本語表記へ変換

## 実装したかった点
- 現在地がOpenWeatherの地点名で分かりにくいのを、日本語表記の地点に実装
- 風向が度数表示になっているのを、16方位に変更
- サンライズ、サンセット時間の表示

## 参考にした書籍・サイト
- 書籍：Java Script「超」入門 　著・狩野祐東
- https://cloud5.jp/yahooapi_lesson/
- https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html
