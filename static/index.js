document.addEventListener("DOMContentLoaded", function () {
    var commandList = document.getElementById("commands");

// subscribe for messages
    var source = new EventSource('/stream');
    var command_current = document.getElementById('command_current');
// handle messages
    source.onmessage = function (event) {
        // Do something with the data:
        console.log(event.data);
        command = JSON.parse(event.data)[0];
        // add to current command
        let last_command = command_current.textContent;
        command_current.textContent = command;

        // add to list
        if (last_command.length > 0) {
            var li = document.createElement("li");
            var t = document.createTextNode(last_command);
            li.appendChild(t);
            if (commandList.childNodes.length > 5) {
                commandList.removeChild(commandList.childNodes[0]);
            }
            if (commandList.childNodes.length > 0) {
                commandList.insertBefore(li, commandList.childNodes[0]);
            } else {
                commandList.append(li);
            }
        }
    };
});
