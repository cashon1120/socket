{% extends './layout.html' %}
{% block title %}首页{% endblock %}
{% block content %}
    <div>
  <div class="all">
      <div class='person'><text id="onLine">在线人数</text></div>
      <div class="contain" id="container">
        <div class="content" id="content"></div>
      </div>
      <div class="footer">
        <div class="footer-input">
        <input type="text" placeholder="输入您要发送的消息" id="message" name="message"></input>
        </div>
        <div>
        <button type="button" class="btn btn-primary" id="sendMessage">发送</button>
        </div>
      </div>
  </div>

  <div class="modal-wrapper" id="setNameWrapper">
    <div class="modal-content">
    <h1>请设置您的昵称</h1>
    <input type="text" class="form-control" name="userName" id="userName" placeholder="输入昵称">
      <button type="button" class="btn btn-primary"id="setName">设置</button>
    </div>  
  </div>

  <div class="all2">
    <div class="title"><text>在线用户列表:</text></div>
    <div id="userList" class="userList">
    </div>
  </div>
  <script type="text/javascript" language="JavaScript" src="javascripts/formatDate.js"></script>
  <script type="text/javascript" language="JavaScript"  src="javascripts/socket.js"></script>
{% endblock %}

