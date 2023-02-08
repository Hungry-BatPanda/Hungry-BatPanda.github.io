const routes = {
    "/": {
        template: "./index.html",
        title: "RoutineUp",
        description: "Develop powerful habits",
    },
    "/privacy-policy": {
        template: "./layouts/privacy-policy.html",
        title: "Privacy Policy",
        description: "",
    },
    404: {
        template: "./layouts/404.html",
        title: "404",
        description: "Page not found",
    },
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

const locationHandler = async () => {
    const location = window.location.pathname; 
    if (location.length == 0) {
        location = "/";
    }

    const route = routes[location] || routes["404"];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    document.title = route.title;

    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};


window.onpopstate = locationHandler;
window.route = route;
locationHandler();
