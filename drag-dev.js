document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll(".stamp-slot");

  slots.forEach(slot => {
    slot.addEventListener("mousedown", function(e) {
      e.preventDefault();
      let shiftX = e.clientX - slot.getBoundingClientRect().left;
      let shiftY = e.clientY - slot.getBoundingClientRect().top;

      const boardRect = document.querySelector(".stamp-board").getBoundingClientRect();

      function moveAt(pageX, pageY) {
        let left = pageX - shiftX - boardRect.left;
        let top = pageY - shiftY - boardRect.top;

        left = Math.max(0, Math.min(left, boardRect.width - slot.offsetWidth));
        top = Math.max(0, Math.min(top, boardRect.height - slot.offsetHeight));

        slot.style.left = left + "px";
        slot.style.top = top + "px";
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener("mouseup", function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        console.log(`${slot.id} style="left:${slot.style.left}; top:${slot.style.top};"`);
        alert(`${slot.id} 位置: left=${slot.style.left}, top=${slot.style.top}`);
      });
    });

    slot.ondragstart = function() { return false; };
  });
});
