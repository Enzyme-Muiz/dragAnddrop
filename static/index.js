const icons = document.querySelectorAll('.icon');
        const dropArea = document.getElementById("drop-area");
            
        // Handle drag start for original icons
        icons.forEach((icon) => {
            icon.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("iconID", event.target.id);
            });
        });
        
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropArea.style.backgroundColor = "#c0ffc0";
        });
        
        dropArea.addEventListener("dragleave", () => {
            dropArea.style.backgroundColor = "#ddd";
        });
        
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            dropArea.style.backgroundColor = "#ddd";
        
            const iconID = event.dataTransfer.getData("iconID");
            const draggedIcon = document.getElementById(iconID);
        
            // if (!draggedIcon) return;
        
            // Clone the dragged icon
            const newIcon = draggedIcon.cloneNode(true);
            newIcon.removeAttribute("id"); // Remove ID to avoid duplication
            newIcon.style.position = "relative";
            newIcon.style.cursor = "grab";
            newIcon.setAttribute("draggable", true);
        
            // Clear previous content and add the new icon
            dropArea.innerHTML = "";
            dropArea.appendChild(newIcon);
        
            // Make the cloned icon draggable
            newIcon.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("iconID", "cloned-icon");
            });
        
            // Detect when dragged outside the drop area and remove the icon
            document.addEventListener("dragover", (event) => {
                const rect = dropArea.getBoundingClientRect();
                if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                ) {
                    newIcon.remove(); // Remove icon if dragged out
                    dropArea.innerHTML = "Drop Here"; // Reset drop area text
                }
            });
        });