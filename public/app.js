import "./styles.css"
var projects
var apiUrl = "http://localhost:3000"

const getData = () => {
    const xhr = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        xhr.onerror = (error) => {
            const message = {
                text: "Connection error.",
                type: "warning"
            }
            console.log(error)
            reject(message)
        }
        xhr.onload = (error) => {
            if (xhr.readyState !== 4){
                console.log(error)
                const message = {
                    text: "Server error.",
                    type: "warning"
                }
                reject(message)
            }
            if (xhr.status === 200){
                const data = xhr.response
                resolve(data)
            } else {
                const message = {
                    text: "Could not retrieve data from server.",
                    type: "warning"
                }
                reject(message)
            }
        }
        xhr.open("GET", `${apiUrl}/get_data`, true)
        xhr.setRequestHeader("content-type", "application/json")
        xhr.responseType = "json"
        xhr.send(null)
    })
}

const insertTechnologies = async() => {
    let techConts = Array.from(document.querySelectorAll(".technologies-container"))
    for (let i = 0; i < techConts.length; i++){
        if (techConts[i].id == projects[i]._id){
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
        let cardHTML = `<div id="${projects[i]._id}" class="project-card">
                            <span id="instorage-title" class="card-title">${projects[i].title}</span>

                            <span id="instorage-descript" class="card-descript">${projects[i].description}</span>

                            <span class="tech-label">Technologies:</span>

                            <div id="${projects[i]._id}" class="technologies-container"></div>

                            <div id="${projects[i]._id}" class="video-link-container">
                                
                                <i
                                    id="video-card-icon"
                                    class="material-icons"
                                    onclick="handleVideoLinkClick(event)"
                                >
                                    smart_display
                                </i>

                                <label
                                    onclick="handleVideoLinkClick(event)"
                                    class="button-descript"
                                >
                                    click to watch demo video
                                </label>

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
        if (projects[i]._id == id){
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


window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Dom Loaded")
    getData().then(async(data) => {
        projects = data
        await insertProjectCards()
        insertTechnologies()
    })
})