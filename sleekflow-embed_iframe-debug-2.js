(function ()
{
    // Get data from client's script tag.
    const tcw = document.querySelector('script[data-companyid][data-id="travischatwidget"]');
    const comid = tcw.getAttribute('data-companyid');
    // Get custom size from client.

    const wOpenWidth = '380px';
    const wOpenHeight = '100vh';
    const wCloseWidth = '300px';
    const wCloseHeight = '300px';
    const bgColor = tcw.getAttribute('data-bg-color') || 'rgba(23,104,255,1)';
    const fontColor = tcw.getAttribute('data-color') || 'rgba(255,255,255,1)';
    // Delay widget load
    const wLoadDelay = parseInt(tcw.getAttribute('data-load-delay')) || 2000;
    setTimeout(() =>
    {
        // const env = 'http://livechat-dev-sleekflow.s3-website-ap-southeast-1.amazonaws.com';
        const env = 'https://chat.sleekflow.io';
        // const env = 'https://chatwidget.azureedge.net';
        // Signalr script
        var widgetFrame = document.createElement('iframe');
        widgetFrame.id = 'travischatwidget';
        widgetFrame.name = 'Travis Chat Widget';
        widgetFrame.src = `${env}/index.html?companyid=${comid}&bgColor=${bgColor}&fontColor=${fontColor}`;
        widgetFrame.style = `position: fixed; bottom: 0; right: 0; border: 0px; padding: 0px; margin: 0px; width: 100px; height: 100px; max-height: 100%; z-index: 2147483646; overscroll-behavior: contain; `;
        widgetFrame.sandbox = 'allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-top-navigation';
        // widgetFrame.sandbox ='allow-scripts allow-same-origin';

        var widgetDiv = document.createElement('div');
        widgetDiv.style = 'position: fixed; bottom: 0; right: 0; border: 0px; padding: 0px; margin: 0px; z-index: 2147483646; overscroll-behavior: contain;';
        widgetDiv.appendChild(widgetFrame);

        var pageTitle = document.title;
        setInterval(() => widgetFrame.contentWindow.postMessage(window.location.href, '*'), 2000);

        const changeIFrame = (e) =>
        {
            console.log('changeIFrame', e);
                if (e.data[0] === 'hasPopup') {
                    document.getElementById("travischatwidget").style.width = '300px';
                    document.getElementById("travischatwidget").style.height = '300px';
                }
                if (e.data[0] === 'noPopup') {
                    document.getElementById("travischatwidget").style.width = '100px';
                    document.getElementById("travischatwidget").style.height = '100px';
                }
                if (e.data[0] === 'maxHeight') {
                    document.getElementById("travischatwidget").style.maxHeight = e.data[1] || "670px";
                }
                if (e.data[0] === 'travischatwidgetopen')
                {
                    if (window.innerWidth < 480)
                    {
                        document.getElementById("travischatwidget").style.width = window.innerWidth + 'px';
                        document.getElementById("travischatwidget").style.height = window.innerHeight + 'px';
                    } else
                    {
                        document.getElementById("travischatwidget").style.width = wOpenWidth;
                        document.getElementById("travischatwidget").style.height = wOpenHeight;
                    }
                } else if (e.data[0] === 'travischatwidgetclose')
                {
                        if (window.innerWidth < 480) {
                            document.getElementById("travischatwidget").style.width = '108px';
                            document.getElementById("travischatwidget").style.height = '145px';
                        } else {
                            document.getElementById("travischatwidget").style.width = wCloseWidth;
                            document.getElementById("travischatwidget").style.height = wCloseHeight;
                        }
                } else if (e.data[0] === "travischatwidgetWelcomeMsg") {
                    document.getElementById("travischatwidget").style.width = "348px";
                    document.getElementById("travischatwidget").style.height = "225px";
                } else if (e.data[0] === 'travischatwidgetunreadcount')
                {
                    if (e.data[1])
                    {
                        document.title = `(${e.data[1]}) ${pageTitle}`;
                    } else
                    {
                        document.title = pageTitle;
                    }
                }
        }

//         window.addEventListener('message', changeIFrame);
        window.addEventListener('message', console.log);

        try
        {
            widgetFrame.appendChild(document.createTextNode(''));
            document.body.appendChild(widgetDiv);
        } catch (e)
        {
            widgetFrame.text = '';
            widgetDiv.text = '';
            document.body.appendChild(widgetDiv);
        }
    }, wLoadDelay);
})();
