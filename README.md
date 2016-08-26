# StockView
Twitter can tell us what's happening, but it is not great for finding business information.

With this extension, you will be able to see live stock information right in your Twitter feed providing context for the current discussion.

Now, when you search Twitter for cashtags like '$TWTR', the stock chart will be displayed so you can really know what is happening.

# Install

\#StockView is packaged as a chrome extension. You can download it here https://github.com/korymath/StockView/raw/master/app.crx and install it under developer mode.

Amusingly "for regular Windows users who are not skilled with computers, it is practically not possible to install and use extensions from outside the Chrome Web Store." -- http://stackoverflow.com/questions/24577024/install-chrome-extension-not-in-the-store

Development Screenshots

Before
==========
Company is suggested, perhaps an account is shown and several recent tweets populate the timeline below.

<img src="app/images/before.png" width="50%">

v1
==========
Rough chart inserted nicely.

<img src="app/images/v1.png" width="50%">

v2
==========
Beautiful chart comes in.

<img src="app/images/v3.png" width="50%">

v3
==========
Multiple stock tickers.

<img src="app/images/v4.png" width="50%">

# Technology 

Highstocks for plotting http://www.highcharts.com/
Data comes from Yahoo historical stock API
