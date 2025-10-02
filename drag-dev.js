document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll(".stamp-slot");

  slots.forEach(slot => {
    slot.onmousedown = function(e) {
      let shiftX = e.clientX - slot.getBoundingClientRect().left;
      let shiftY = e.clientY - slot.getBoundingClientRect().top;

      slot.style.zIndex = 1000;

      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
        const boardRect = document.querySelector(".stamp-board").getBoundingClientRect();
        let left = pageX - shiftX - boardRect.left;
        let top = pageY - shiftY - boardRect.top;

        left = Math.max(0, Math.min(left, boardRect.width - slot.offsetWidth));
        top = Math.max(0, Math.min(top, boardRect.height - slot.offsetHeight));

        slot.style.left = left + 'px';
        slot.style.top = top + 'px';
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      slot.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        slot.onmouseup = null;

        // 現在位置を表示（コピー用）
        console.log(`${slot.id} style="left:${slot.style.left}; top:${slot.style.top};"`);
        alert(`${slot.id} 位置: left=${slot.style.left}, top=${slot.style.top}`);
      };
    };

    slot.ondragstart = function() { return false; };
  });
});
