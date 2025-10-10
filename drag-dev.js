document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".stamp-board");
  const boardRect = board.getBoundingClientRect();
  const slots = document.querySelectorAll(".stamp-slot");

  slots.forEach(slot => {
    slot.addEventListener("mousedown", function(e) {
      e.preventDefault();
      const shiftX = e.clientX - slot.getBoundingClientRect().left;
      const shiftY = e.clientY - slot.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        let left = pageX - shiftX - board.getBoundingClientRect().left;
        let top = pageY - shiftY - board.getBoundingClientRect().top;

        left = Math.max(0, Math.min(left, board.clientWidth - slot.offsetWidth));
        top = Math.max(0, Math.min(top, board.clientHeight - slot.offsetHeight));

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

        // %座標計算
        const leftPercent = ((slot.offsetLeft / board.clientWidth) * 100).toFixed(2);
        const topPercent = ((slot.offsetTop / board.clientHeight) * 100).toFixed(2);

        const code = `<div class="stamp-slot" id="${slot.id}" style="left:${leftPercent}%; top:${topPercent}%;">
  <img src="${slot.querySelector("img").src}" alt="${slot.querySelector("img").alt}">
</div>`;

        console.log(code);
        alert(`${slot.id} %座標:\nleft:${leftPercent}%, top:${topPercent}%\n\nコピーして固定版に貼り付けてください`);
      });
    });

    slot.ondragstart = function() { return false; };
  });
});
