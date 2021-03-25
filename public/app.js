import "./styles.css"
const projects = [
    {
        id: "0",
        title: "InStorage",
        description: `InStorage is a storage management application developed with React.js,
                        Redux, CSS and SVG on the frontend and Node.js and MongoDB on the backend.
                        This application was not intended for production as it was a project I used to
                        experiment with the above-mentioned technologies.`,
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Json Web Token", "Webpack", "Babel", "CSS", "HTML", "React.js", "Redux", "SVG", "cloud"],
        link: "https://google.com",
        //video: "https://adammwebsite.s3.eu-central-1.amazonaws.com/InStorage_Demo.mp4"
        //video: "../static/videos/InStorage_Demo.mp4"
        video: "https://www.youtube.com/embed/M5npoAcG2V0"
    },
    {
        id: "1",
        title: "Instagram Tree",
        description: `Instagram Tree is an Instagram posts management application I am building
                        for a client in Hong Kong. It is a single-page web app utilising React.js, 
                        Redux and CSS on the frontend and Node.js on the backend. Data is saved
                        to a MongoDB database hosted on MongoDB Atlas cloud service.
                        Regular users can see the posts and go to the company's website by clicking on them.
                        There is also an admin content management page, where the admin can add new posts,
                        delete them, as well as change the order in which the posts appear on the users' page.
                        Post thumbnail images are resized and posted to AWS S3 storage service.`,
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Json Web Token", "Webpack", "Babel", "CSS", "HTML", "React.js", "Redux", "cloud"],
        link: "https://google.com",
        //video: "https://adammwebsite.s3.eu-central-1.amazonaws.com/InstaTree_Demo_Video.mp4",
        //video: "../static/videos/InstaTree_Demo_Video.mp4",
        video: "https://www.youtube.com/embed/NCkEVFZOhgE"
    }
]

const insertTechnologies = async() => {
    let techConts = Array.from(document.querySelectorAll(".technologies-container"))
    for (let i = 0; i < techConts.length; i++){
        if (techConts[i].id == projects[i].id){
            for (let j = 0; j < projects[i].technologies.length; j++){
                let html = `<span class="technology-item">${projects[i].technologies[j]}</span>`
                techConts[i].insertAdjacentHTML("beforeend", html)
            }
        }
    }
}

const insertProjectCards = async() => {
    let portfolio = document.querySelector(".portfolio-container")
    for (let i = 0; i < projects.length; i++){
        let cardHTML = `<div id="${projects[i].id}" class="project-card">
                            <span id="instorage-title" class="card-title">${projects[i].title}</span>

                            <span id="instorage-descript" class="card-descript">${projects[i].description}</span>

                            <span class="tech-label">Technologies:</span>

                            <div id="${projects[i].id}" class="technologies-container"></div>

                            <div id="${projects[i].id}" class="video-link-container">
                                
                                <i
                                    id="video-card-icon"
                                    class="material-icons"
                                    onclick="handleVideoLinkClick(event)"
                                >
                                    smart_display
                                </i>

                                <label class="button-descript">click to watch demo video</label>

                            </div>

                        </div>`
        portfolio.insertAdjacentHTML("beforeend", cardHTML)
    }
}

const handleVideoLinkClick = (event) => {
    event.stopPropagation()
    let id = event.target.parentNode.id, video
    let videoPlayer = document.querySelector(".video-player")
    let modalBackground = document.querySelector(".modal-wrapper")
    for (let i = 0; i < projects.length; i++){
        if (projects[i].id == id){
            video = projects[i].video
        }
    }
    let html = `<iframe
                    class="video"
                    width="100%" height="100%" src="${video}"
                    title="YouTube video player" frameborder="0" allow="accelerometer;
                    autoplay; clipboard-write; encrypted-media; gyroscope;
                    picture-in-picture" allowfullscreen>
                </iframe>`
    let closeButton = `<i
                            id="close-button"
                            class="material-icons"
                            onclick="handleClosePlayer(event)"
                        >
                            close
                        </i>`
    window.scrollTo(0, 0)
    modalBackground.style.display = "block"
    videoPlayer.style.display = "block"
    videoPlayer.insertAdjacentHTML("beforeend", html)
    videoPlayer.insertAdjacentHTML("beforeend", closeButton)
}

const handleClosePlayer = (event) => {
    let modalBackground = document.querySelector(".modal-wrapper")
    let videoPlayer = document.querySelector(".video-player")
    let video = document.querySelector(".video")
    let closeButton = document.getElementById("close-button")
    videoPlayer.removeChild(video)
    videoPlayer.removeChild(closeButton)
    videoPlayer.style.display = "none"
    modalBackground.style.display = "none"
}

/* expose functions to global scope */
window.handleClosePlayer = handleClosePlayer
window.handleVideoLinkClick = handleVideoLinkClick


window.addEventListener('DOMContentLoaded', async(event) => {
    console.log("Dom Loaded")
    await insertProjectCards()
    await insertTechnologies()
})