FCT TV — TV Client
=================

<img src="http://imgur.com/ZoDtdrI.png" width="200px">

## General info

**FCT TV** is an idea for a campus' TV at FCT-UNL, which will satisfy the student's needs and raise the awareness for the interesting events that are offered every day.

Our solution has 4 different parts:

* TV Client (this one)
* <a href="https://github.com/gdiasdasilva/CampusTV-WebServer" target="_blank">Ruby on Rails Web server</a>
* <a href="https://github.com/gdiasdasilva/python-crawlers" target="_blank">Information crawlers (in Python)</a>
* iPhone app

## Description

This TV Client has 2 major components:

##### TV

The TV component is based on HTML, CSS and JavaScript. The information that is shown in the screen comes from the Web Server.

##### Proxy

The proxy is implemented in Java and downloads the videos (with <a href="https://github.com/np1/pafy" target="_blank">pafy - python</a>) and information that is needed.

You can run the Java client (proxy) with: `java -Xmx1g -cp .:java-json.jar pi.Client client_name your_machine_IP`

## Authors

* Gonçalo Dias da Silva
* João Francisco Pinto
* Rui Carvalho
