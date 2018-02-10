pragma solidity^0.4.17;

contract Inbox {
  public string message;

  function Inbox(string initialMessage) public {
    message = initialMessage;
  }

  function setMessage(string newMessage) public {
    message = newMessage;
  }
}
