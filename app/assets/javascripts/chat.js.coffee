//= require websocket_rails/main

jQuery -> return window.chatController = new Chat.Controller(window.location.host + "/websocket", true);

window.Chat = {}

class Chat.User
  constructor: (@user_name) ->
  serialize: => { user_name: @user_name }

class Chat.Controller
  template: (message) ->
    html =
      """
      <div class="messages" >
        <label class="label label-info">
          [#{message.received}] #{message.user_name}
        </label>&nbsp;
        #{message.msg_body}
      </div>
      """
    $(html)

  userListTemplate: (userList) ->
    userHtml = ""
    userListUnique = []
    for user in userList
      if userListUnique.indexOf(user.user_name) is -1
        userListUnique.push(user.user_name)
        userHtml = userHtml + "<li>#{user.user_name}</li>"
    $(userHtml)

  constructor: (url,useWebSockets) ->
    @messageQueue = []
    @dispatcher = new WebSocketRails(url,useWebSockets)
    @dispatcher.on_open = @createUser
    @bindEvents()

  bindEvents: =>
    @dispatcher.bind 'new_message', @newMessage
    @dispatcher.bind 'user_list', @updateUserList
    $('#send').on 'click', @sendMessage
    $('#message').keypress (e) -> $('#send').click() if e.keyCode == 13

  newMessage: (message) =>
    @messageQueue.push message
    @shiftMessageQueue() if @messageQueue.length > $('#chat-data').data('maxmsgs')
    @appendMessage message

  sendMessage: (event) =>
    event.preventDefault()
    message = $('#message').val()
    if message.length > 0
      @dispatcher.trigger 'send_message', {user_name: @user.user_name, msg_body: message}
      $('#message').val('')

  updateUserList: (userList) =>
    $('#user-list').html @userListTemplate(userList)

  appendMessage: (message) ->
    messageTemplate = @template(message)
    $('#chat-messages').append messageTemplate
    messageTemplate.slideDown 140

  shiftMessageQueue: =>
    @messageQueue.shift()
    $('#chat-messages div.messages:first').slideDown 100, ->
      $(this).remove()

  createUser: =>
    @user = new Chat.User($('#chat-data').data('username'))
    @dispatcher.trigger 'new_user', @user.serialize()
    list = $('#chat-data').data('oldmsgs')
    for each of list
      @newMessage list[each]
