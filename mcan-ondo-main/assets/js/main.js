window.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector("#preloader");
  loader.className = "hidden";
  loader.style.display = "none";
  loader.style.visibility = "hidden";
});

!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(
          ".nav-menu ul:first li:first, .mobile-nav ul:first li:first"
        ).addClass("active");
      }
    });
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
      $("#topbar").addClass("topbar-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
      $("#topbar").removeClass("topbar-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
    $("#topbar").addClass("topbar-scrolled");
  }
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      900: {
        items: 2,
      },
    },
  });

  // Initiate the venobox plugin
  $(document).ready(function () {
    $(".venobox").venobox();
  });

  // Initiate the datepicker plugin
  $(document).ready(function () {
    $(".datepicker").datepicker({
      autoclose: true,
    });
  });
})(jQuery);

// Get the form and modal elements by their IDs
const form = document.getElementById("contact-form");
const modal = document.getElementById("success-modal");
const closeModalButton = document.getElementById("close-modal");

// Listen for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission (no page reload)

  // Create a FormData object to collect the form data
  const formData = new FormData(form);

  // Send the form data to the Google Apps Script URL using Fetch API
  fetch(
    "https://script.google.com/macros/s/AKfycbznXe6nAyx2hvmRBBHN2Xh5fU_ncQvzgAmdT143WuK2l5Jo9F89Y2XbJ9kqhJYHDDmnUg/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      // Show the modal with success message
      modal.style.display = "flex"; // Make the modal visible
    })
    .catch((error) => {
      // Show an error alert (optional, you can add more error handling)
      alert("There was an error submitting the form. Please try again.");
    });
});

// Close the modal when the "Okay" button is clicked
closeModalButton.addEventListener("click", function () {
  modal.style.display = "none"; // Hide the modal
  form.reset(); // Reset the form after submission
});

// Function to show University or Polytechnic options based on the selection
function showSchoolOptions() {
  var schoolType = document.getElementById("schoolType").value;
  if (schoolType === "university") {
    document.getElementById("universitySelect").style.display = "block";
    document.getElementById("polytechnicSelect").style.display = "none";
  } else if (schoolType === "polytechnic") {
    document.getElementById("polytechnicSelect").style.display = "block";
    document.getElementById("universitySelect").style.display = "none";
  } else {
    document.getElementById("universitySelect").style.display = "none";
    document.getElementById("polytechnicSelect").style.display = "none";
  }
}

// Show/hide text inputs for "Other" universities and polytechnics
document.getElementById("university").addEventListener("change", function () {
  var otherUniversity = document.getElementById("university").value === "Other";
  document.getElementById("otherUniversity").style.display = otherUniversity
    ? "block"
    : "none";
});

document.getElementById("polytechnic").addEventListener("change", function () {
  var otherPolytechnic =
    document.getElementById("polytechnic").value === "Other";
  document.getElementById("otherPolytechnic").style.display = otherPolytechnic
    ? "block"
    : "none";
});

// Handle form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(event.target);

    fetch(
      "https://script.google.com/macros/s/AKfycbxFfi470kqwmtAdTI-ZY477nc_zW_08QM0G91Lr1rWmrgpHBdHK9tlgCrrfOFFsjZh81g/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registration Successful!") {
          showAlert();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Show the custom alert
function showAlert() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("customAlert").style.display = "block";
}

// Close the custom alert
function closeAlert() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("customAlert").style.display = "none";
}
