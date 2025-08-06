
      // Sister's images array (replace with actual images if you have them)
      const sisterImages = [
        "./assets/1.jpg",
        "./assets/16.jpg",
        "./assets/2.jpg",
        "./assets/17.jpg",
        "./assets/3.jpg",
        "./assets/11.jpg",
        "./assets/12.jpg",
        "./assets/4.jpg",
        "./assets/5.jpg",
        "./assets/6.jpg",
        "./assets/7.jpg",
        "./assets/13.jpg",
        "./assets/14.jpg",
        "./assets/15.jpg",
        "./assets/8.jpg",
        "./assets/18.jpg",
        "./assets/9.jpg",
        "./assets/10.jpg",
      ];

      // Create cursor follower images - only on non-touch devices
      function initCursorImages() {
        // Check if device supports hover (not touch device)
        if (window.matchMedia("(hover: hover)").matches) {
          const cursorImagesContainer = document.getElementById("cursorImages");

          sisterImages.forEach((imgSrc, index) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.className = "cursor-image";
            img.style.transitionDelay = `${index * 0.1}s`;
            cursorImagesContainer.appendChild(img);
          });

          // Track mouse movement
          document.addEventListener("mousemove", function (e) {
            const images = document.querySelectorAll(".cursor-image");
            images.forEach((img, index) => {
              setTimeout(() => {
                img.style.left = `${e.clientX + (index * 10 - 20)}px`;
                img.style.top = `${e.clientY + (index * 10 - 20)}px`;
                img.style.opacity = "1";

                setTimeout(() => {
                  img.style.opacity = "0";
                }, 500);
              }, index * 50);
            });
          });
        }
      }

      // Create card deck - now responsive
      function createCardDeck() {
        const cardDeck = document.querySelector(".card-deck");
        const images = [
          "./assets/1.jpg",
          "./assets/16.jpg",
          "./assets/2.jpg",
          "./assets/17.jpg",
          "./assets/3.jpg",
          "./assets/11.jpg",
          "./assets/12.jpg",
          "./assets/4.jpg",
          "./assets/5.jpg",
          "./assets/6.jpg",
          "./assets/7.jpg",
          "./assets/13.jpg",
          "./assets/14.jpg",
          "./assets/15.jpg",
          "./assets/8.jpg",
          "./assets/18.jpg",
          "./assets/9.jpg",
          "./assets/10.jpg",
        ];

        // Calculate card size based on viewport width
        const isMobile = window.innerWidth < 640;
        const cardOffset = isMobile ? 1.5 : 2;
        const cardRotation = isMobile ? 0.5 : 2;

        // Create cards with slight offset for deck effect
        images.forEach((img, index) => {
          const card = document.createElement("div");
          card.className = "memory-card";
          card.style.backgroundImage = `url(${img})`;
          card.style.zIndex = images.length - index;
          card.style.transform = `translateY(${index * cardOffset}px) rotate(${
            (index - 2) * cardRotation
          }deg)`;
          card.addEventListener("click", handleCardClick);
          cardDeck.appendChild(card);
        });
      }

      // Handle card click
      function handleCardClick(e) {
        const card = e.currentTarget;
        card.classList.add("active");

        // After animation completes, move card to back
        setTimeout(() => {
          card.style.zIndex = 1;
          const cards = document.querySelectorAll(".memory-card");
          cards.forEach((c) => {
            if (c !== card) {
              c.style.zIndex = parseInt(c.style.zIndex) + 1;
            }
          });

          // Remove animation class after it completes
          setTimeout(() => {
            card.classList.remove("active");
          }, 500);
        }, 500);
      }

      // Popup functions
      function showPopup(type) {
        const popup = document.getElementById("popupOverlay");
        const title = document.getElementById("popupTitle");
        const content = document.getElementById("popupContent");

        popup.classList.remove("hidden");
        popup.querySelector("div > div").classList.add("animate__bounceIn");

        if (type === "cake") {
          title.textContent = "Delicious Cake for You!";
          content.innerHTML = `
                    <div class="floating">
                        <img src="./assets/cake.jpg" alt="Birthday Cake" class="w-full rounded-lg mb-4 w-64 mx-auto">
                    </div>
                    <p class="text-gray-700">A special cake for a special sister! Hope you enjoy every bite!</p>
                `;
        } else if (type === "love") {
          title.textContent = "Lots of Love!";
          content.innerHTML = `
                    <div class="floating-delay">
                        <img src="./assets/love.jpg" alt="Heart" class="w-full mx-auto mb-4">
                    </div>
                    <p class="text-gray-700">Sending you infinite love and warm hugs on your birthday!</p>
                    <div class="mt-4 text-4xl">
                        ❤️❤️❤️
                    </div>
                `;
        }
      }

      function hidePopup() {
        const popup = document.getElementById("popupOverlay");
        popup.querySelector("div > div").classList.remove("animate__bounceIn");
        popup.querySelector("div > div").classList.add("animate__fadeOut");

        setTimeout(() => {
          popup.classList.add("hidden");
          popup.querySelector("div > div").classList.remove("animate__fadeOut");
        }, 500);
      }

      // Special surprise function
      function showSpecialSurprise() {
        const surpriseCard = document.getElementById("specialSurprise");
        surpriseCard.classList.remove("translate-y-full");
        surpriseCard.classList.add("translate-y-0");

        // Play music
        const song = document.getElementById("birthday-song");
        song.currentTime = 30;
        song.play();

        // Create confetti
        createConfetti();

        // Create more confetti every 3 seconds
        setInterval(createConfetti, 3000);

        // Change button text
        const btn = document.querySelector('[onclick="showSpecialSurprise()"]');
        btn.textContent = "Enjoy Your Day!";
        btn.classList.remove("animate__pulse");
        btn.classList.add("bg-gradient-to-r", "from-yellow-400", "to-pink-500");
      }

      // Confetti effect
      function createConfetti() {
        const colors = [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#009688",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFEB3B",
          "#FFC107",
          "#FF9800",
          "#FF5722",
        ];

        const container = document.getElementById("confetti-container");

        for (let i = 0; i < 100; i++) {
          const confetti = document.createElement("div");
          confetti.className = "confetti";
          confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * window.innerWidth + "px";
          confetti.style.top = -10 + "px";
          confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
          container.appendChild(confetti);

          const animationDuration = Math.random() * 3 + 2;

          confetti.animate(
            [
              { top: -10 + "px", opacity: 1 },
              { top: window.innerHeight + "px", opacity: 0 },
            ],
            {
              duration: animationDuration * 1000,
              easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
            }
          );

          setTimeout(() => {
            confetti.remove();
          }, animationDuration * 1000);
        }
      }

      // Handle window resize
      function handleResize() {
        // Recreate card deck on resize to adjust card positions
        const cardDeck = document.querySelector(".card-deck");
        cardDeck.innerHTML = "";
        createCardDeck();
      }

      // Initialize everything when DOM is loaded
      document.addEventListener("DOMContentLoaded", function () {
        initCursorImages();
        createCardDeck();
        
        // Add resize listener
        window.addEventListener("resize", handleResize);
      });