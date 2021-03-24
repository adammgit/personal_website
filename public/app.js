const projects = [
    {
        id: "0",
        title: "InStorage",
        description: "A Storage management application",
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Json Web Token", "Webpack", "Babel", "CSS", "HTML", "React.js", "Redux", "SVG"],
        link: "https://google.com",
        video: "https://adammwebsite.s3.eu-central-1.amazonaws.com/InStorage_Demo.mp4"
        //video: "../static/videos/InStorage_Demo.mp4"
        // video: "https://youtu.be/M5npoAcG2V0"
    },
    {
        id: "1",
        title: "Instagram Tree",
        description: "Instagram posts app with an admin content management page",
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Json Web Token", "Webpack", "Babel", "CSS", "HTML", "React.js", "Redux"],
        link: "https://google.com",
        video: "https://adammwebsite.s3.eu-central-1.amazonaws.com/InstaTree_Demo_Video.mp4"
        //video: "../static/videos/InstaTree_Demo_Video.mp4"
        // video: "https://youtu.be/NCkEVFZOhgE"
    }
]

const insertTechnologies = async() => {
    let techConts = Array.from(document.querySelectorAll(".technologies-container"))
    console.log(techConts)
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
                    
                            <div class="link-container">

                                <a href="${projects[i].link}">
                                    <img
                                        class="link-card-icon"
                                        src="../static/images/link.svg"
                                    />
                                </a>
                                <label class="button-descript">click to see more</label>

                            </div>

                            <div class="video-link-container">
                                
                                <img
                                    id="${projects[i].id}"
                                    class="video-card-icon"
                                    src="../static/images/play_video.svg"
                                    onclick="handleVideoLinkClick(event)"
                                />
                                <label class="button-descript">click to watch demo video</label>

                            </div>

                        </div>`
        portfolio.insertAdjacentHTML("beforeend", cardHTML)
    }
}

const handleVideoLinkClick = (event) => {
    event.stopPropagation()
    let id = event.target.id, video
    let videoPlayer = document.querySelector(".video-player")
    let modalBackground = document.querySelector(".modal-wrapper")
    for (let i = 0; i < projects.length; i++){
        if (projects[i].id == id){
            video = projects[i].video
        }
    }
    let html = `<video class="video" width="100%" height="100%" controls autoplay>
                    <source src="${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`
    let closeButton = `<img
                            src="../static/images/close_small.svg"
                            class="close-button"
                            onclick="handleClosePlayer(event)"
                        />`
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
    let closeButton = document.querySelector(".close-button")
    videoPlayer.removeChild(video)
    videoPlayer.removeChild(closeButton)
    videoPlayer.style.display = "none"
    modalBackground.style.display = "none"
}


window.addEventListener('DOMContentLoaded', async(event) => {
    console.log("Dom Loaded")
    await insertProjectCards()
    await insertTechnologies()
})