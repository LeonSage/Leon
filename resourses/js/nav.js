let navHtml = `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="index.html" class="navbar-brand"><img src="images/leon.png" alt="Brand"></a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="index.html">首页 <span class="sr-only">(Current)</span></a></li>
                    <li><a href="resume.html">简历</a></li>
                    <li><a href="LeonShop.html">Leon购物</a></li>
                    <li><a href="learn.html">前端技能</a></li>
                    <li><a href="algorithm.html">算法</a></li>
                    <li><a href="homepage/nodeJs.html">Node.js</a></li> 
                    <li><a href="homepage/echarts.html">ECharts</a></li>                
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="ture" aria-expanded="false">实例展示<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="demo/scrollWindow.html">视频滚动窗口</a></li>
                            <li><a href="demo/form.html">表单功能</a></li>
                            <li><a href="demo/AJAX.html">AJAX</a></li>
                            <li><a href="demo/plugins.html">jQuery插件的编写</a></li>
                            <li><a href="demo/getIp.html">我当前IP和所在地</a></li>
                            <li><a href="demo/clockBoard.html">Canvas仪表盘</a></li>
                            <li><a href="demo/motion.html">Canvas波浪滚动</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="ture" aria-expanded="false">源码<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="modules/sourcecode/jquery-3.2.1/index.html">jQuery3.2.1</a></li>
                            <li><a href="demo/form.html">表单功能</a></li>
                            <li><a href="demo/AJAX.html">AJAX</a></li>
                            <li><a href="demo/plugins.html">jQuery插件的编写</a></li>
                            <li><a href="demo/getIp.html">我当前IP和所在地</a></li>
                            <li><a href="demo/clockBoard.html">Canvas仪表盘</a></li>
                            <li><a href="demo/motion.html">Canvas波浪滚动</a></li>
                        </ul>
                    </li>
                </ul>
                <p class="nav navbar-nav navbar-right navbar-text">Leon的生活</p>
            </div>
        </div>
    </nav>`;
$('#nav').html(navHtml);