/* ==========================================================================
   StepCode Interactive Script File (Vanilla JS)
   Contains: Tech Tree spotlight, Mode toggle, Simulated Live feed,
             Interactive card tilting, and Multi-step signup flow.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ================= 1. THEME / MODE TOGGLE SYSTEM =================
    const body = document.body;
    const btnStudent = document.getElementById("toggle-student-mode");
    const btnUniv = document.getElementById("toggle-univ-mode");

    function setMode(mode) {
        if (mode === "student") {
            body.classList.remove("univ-mode");
            body.classList.add("student-mode");
            btnStudent.classList.add("active");
            btnUniv.classList.remove("active");
            // Highlight first node in tech tree by default when entering student mode
            activateTechTreeNode("youtube");
        } else {
            body.classList.remove("student-mode");
            body.classList.add("univ-mode");
            btnUniv.classList.add("active");
            btnStudent.classList.remove("active");
        }
    }

    btnStudent.addEventListener("click", () => setMode("student"));
    btnUniv.addEventListener("click", () => setMode("university"));

    // ================= 2. INTERACTIVE TECH-TREE (MIND-MAP) =================
    const nodesData = {
        youtube: {
            step: "Step 1: Foundational Intake",
            title: "YouTube Learning Pathways",
            desc: "Tired of tutorial hell? StepCode filters chaotic YouTube playlists, structures them into linear learning pathways, and injects checkpoint quizzes to prove retention.",
            bullets: [
                "Curates chaotic external lectures into structured academic sequences",
                "Injects video-checkpoint quizzes to guarantee active viewing",
                "Tracks student view consistency automatically"
            ],
            progress: 100
        },
        react: {
            step: "Step 2: Core Engineering",
            title: "Structured React Course",
            desc: "Advance to core framework training. Follow structured modules with integrated assignments that check understanding of components, hooks, state, and rendering cycles.",
            bullets: [
                "Hands-on coding challenges executed directly in browser-sandbox",
                "Graded assignments for core frontend state concepts",
                "Direct mentorship review loops"
            ],
            progress: 80
        },
        github: {
            step: "Step 3: Verification & Audits",
            title: "GitHub Commit Verification",
            desc: "Connect your GitHub account. StepCode monitors repository activity, audits commit frequency, and automatically evaluates code syntax to verify that you are the author.",
            bullets: [
                "Cryptographic check of student commits and branch activity",
                "Automated plagiarism and syntax audit tracking",
                "Consistency-streak tracking to maintain execution habits"
            ],
            progress: 95
        },
        realworld: {
            step: "Step 4: Industry Adaptation",
            title: "Real-World Project Milestones",
            desc: "Stop building simple todo apps. StepCode prompts you to build fully verified full-stack applications with concrete product milestones (APIs, auth, hosting).",
            bullets: [
                "Build scalable features matching production specs",
                "Milestone approvals verified by senior industry mentors",
                "Generates working deployments for direct portfolio links"
            ],
            progress: 60
        },
        build: {
            step: "Step 5: Competency Hardening",
            title: "Build & Soft Skills Hardening",
            desc: "Hone the exact interdisciplinary skills required in the modern workspace. Includes professional communication, git collaboration, and design thinking execution.",
            bullets: [
                "Activity-based evaluation for continuous assessment",
                "Milestone-by-milestone portfolio reviews",
                "Simulated collaborative features mimicking agile teams"
            ],
            progress: 75
        },
        dsa: {
            step: "Step 6: Placement Funnel",
            title: "DSA & Problem Solving",
            desc: "Nail technical interview screens. Practice with structured Data Structures & Algorithms modules curated from top industry interview patterns.",
            bullets: [
                "Pre-configured roadmap with top 150 interview problems",
                "Continuous feedback on memory and runtime efficiency",
                "Weekly mock technical coding tests under pressure"
            ],
            progress: 90
        }
    };

    const treeNodes = document.querySelectorAll(".tree-node");
    const flowLines = document.querySelectorAll(".flow-line");
    
    // Spotlight Elements
    const spotlightStep = document.getElementById("spotlight-step");
    const spotlightTitle = document.getElementById("spotlight-title");
    const spotlightDesc = document.getElementById("spotlight-desc");
    const spotlightList = document.getElementById("spotlight-list");
    const spotlightProgress = document.getElementById("spotlight-progress");
    const progressVal = document.getElementById("progress-val");
    const spotlightContent = document.getElementById("spotlight-content");

    function activateTechTreeNode(nodeId) {
        // Toggle Active Class on Nodes
        treeNodes.forEach(node => {
            if (node.getAttribute("data-node") === nodeId) {
                node.classList.add("active");
            } else {
                node.classList.remove("active");
            }
        });

        // Toggle Active Class on Connecting Path Flow Lines
        flowLines.forEach(line => {
            if (line.getAttribute("id") === `path-${nodeId}`) {
                line.classList.add("active");
            } else {
                line.classList.remove("active");
            }
        });

        // Update Spotlight card with Fade Animation
        const data = nodesData[nodeId];
        if (data) {
            spotlightContent.style.opacity = 0;
            spotlightContent.style.transform = "translateY(5px)";
            
            setTimeout(() => {
                spotlightStep.innerText = data.step;
                spotlightTitle.innerText = data.title;
                spotlightDesc.innerText = data.desc;
                
                // Bullet List builder
                spotlightList.innerHTML = "";
                data.bullets.forEach(bullet => {
                    const li = document.createElement("li");
                    li.innerText = bullet;
                    spotlightList.appendChild(li);
                });

                // Progress Bar animation
                spotlightProgress.style.width = `${data.progress}%`;
                progressVal.innerText = `${data.progress}%`;

                // Fade back in
                spotlightContent.style.opacity = 1;
                spotlightContent.style.transform = "translateY(0)";
            }, 200);
        }
    }

    // Attach click and hover events to Tech Tree Nodes
    treeNodes.forEach(node => {
        const nodeId = node.getAttribute("data-node");
        
        node.addEventListener("click", () => {
            activateTechTreeNode(nodeId);
        });

        node.addEventListener("mouseenter", () => {
            activateTechTreeNode(nodeId);
        });
    });

    // Initialize first node on load
    activateTechTreeNode("youtube");


    // ================= 3. B2B LIVE ACTIVITY LOG SIMULATOR =================
    const activityLogList = document.getElementById("activity-log-list");
    const students = [
        "Amit Sharma", "Shreya Gupta", "Vipin Pathak", "Ananya Mishra", 
        "Rohan Sen", "Kritika Roy", "Pranav Jha", "Riya Malhotra"
    ];
    const batches = ["B.Tech CSE (Batch A)", "B.Tech CSE (Batch B)", "B.Tech AI/ML", "B.Tech ECE"];
    const actions = [
        { desc: "submitted <em>Milestone 3: Low-Fi Prototype</em>", tag: "Milestone 3", tagClass: "tag-success" },
        { desc: "linked new GitHub repository: <code>stepcode-dashboard-clone</code>", tag: "GitHub Auth", tagClass: "tag-github" },
        { desc: "completed 5 DSA arrays challenges on roadmap", tag: "DSA Track", tagClass: "tag-info" },
        { desc: "requested mentor feedback on <em>Milestone 2 revisions</em>", tag: "Feedback Request", tagClass: "tag-warning" }
    ];

    function addLiveActivity() {
        if (!activityLogList) return;

        const randStudent = students[Math.floor(Math.random() * students.length)];
        const randBatch = batches[Math.floor(Math.random() * batches.length)];
        const randAction = actions[Math.floor(Math.random() * actions.length)];

        const logItem = document.createElement("div");
        logItem.className = "log-item";
        logItem.innerHTML = `
            <span class="time-stamp">Just now</span>
            <span class="log-desc"><strong>${randStudent}</strong> (${randBatch}) ${randAction.desc}</span>
            <span class="log-tag ${randAction.tagClass}">${randAction.tag}</span>
        `;

        // Update "Just now" timestamps of previous logs
        const previousJustNows = activityLogList.querySelectorAll(".time-stamp");
        previousJustNows.forEach(stamp => {
            if (stamp.innerText === "Just now") {
                stamp.innerText = "1m ago";
            } else if (stamp.innerText === "1m ago") {
                stamp.innerText = "3m ago";
            } else if (stamp.innerText === "3m ago") {
                stamp.innerText = "5m ago";
            }
        });

        // Prepend new activity
        activityLogList.insertBefore(logItem, activityLogList.firstChild);

        // Limit size of log stack
        if (activityLogList.children.length > 6) {
            activityLogList.removeChild(activityLogList.lastChild);
        }
    }

    // Tick every 5 seconds to insert new mock activities in University view
    setInterval(addLiveActivity, 5000);


    // ================= 4. CARD TILTING ANIMATION ("WITH STEPCODE, YOU") =================
    const tiltCards = document.querySelectorAll(".interactive-tilt");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // Mouse coordinates relative to card center
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;
            
            // Calculate tilt angle (max 8 degrees)
            const angleX = -(mouseY / (cardHeight / 2)) * 8;
            const angleY = (mouseX / (cardWidth / 2)) * 8;

            card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });


    // ================= 5. MULTI-STEP SIGNUP MODAL FLOW =================
    const modal = document.getElementById("onboarding-modal");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const closeModalBtn = document.getElementById("modal-close-btn");
    const progressFill = document.getElementById("modal-progress");
    
    // Modal Step Elements
    const modalSteps = document.querySelectorAll(".modal-step");
    const optStudent = document.getElementById("option-student");
    const optEducator = document.getElementById("option-educator");
    
    const step1Next = document.getElementById("step1-next");
    const step2aNext = document.getElementById("step2a-next");
    const step2aBack = document.getElementById("step2a-back");
    const step2bNext = document.getElementById("step2b-next");
    const step2bBack = document.getElementById("step2b-back");
    
    const successTitle = document.getElementById("success-title");
    const successText = document.getElementById("success-text");
    const successSpinner = document.getElementById("success-spinner");
    const successCheck = document.getElementById("success-check");
    const successActions = document.getElementById("success-actions");
    const successFinishBtn = document.getElementById("success-finish-btn");
    
    let selectedAudience = ""; // "student" or "educator"
    let selectedTrack = ""; // frontend, backend, aiml, dsa

    // Open Modal
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            resetModal();
            modal.classList.add("open");
        });
    });

    // Close Modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("open");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("open");
        }
    });

    function resetModal() {
        goToStep(1);
        optStudent.classList.remove("selected");
        optEducator.classList.remove("selected");
        selectedAudience = "";
        step1Next.classList.add("disabled");
        step1Next.disabled = true;

        document.querySelectorAll(".selector-btn").forEach(btn => btn.classList.remove("selected"));
        selectedTrack = "";
        step2aNext.classList.add("disabled");
        step2aNext.disabled = true;

        document.getElementById("inst-name").value = "";

        successSpinner.style.display = "block";
        successCheck.style.display = "none";
        successActions.style.opacity = 0;
        successActions.style.pointerEvents = "none";
    }

    function goToStep(stepNum) {
        modalSteps.forEach(step => {
            step.classList.remove("active");
        });
        
        let targetStep = document.querySelector(`.modal-step[data-step="${stepNum}"]`);
        if (targetStep) {
            targetStep.classList.add("active");
        }

        // Adjust progress bar
        let progressPercent = 33;
        if (stepNum === "2a" || stepNum === "2b") progressPercent = 66;
        if (stepNum === 3) progressPercent = 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    // Step 1 Selection
    optStudent.addEventListener("click", () => {
        optStudent.classList.add("selected");
        optEducator.classList.remove("selected");
        selectedAudience = "student";
        step1Next.classList.remove("disabled");
        step1Next.disabled = false;
    });

    optEducator.addEventListener("click", () => {
        optEducator.classList.add("selected");
        optStudent.classList.remove("selected");
        selectedAudience = "educator";
        step1Next.classList.remove("disabled");
        step1Next.disabled = false;
    });

    step1Next.addEventListener("click", () => {
        if (selectedAudience === "student") {
            goToStep("2a");
        } else {
            goToStep("2b");
        }
    });

    // Step 2A (Student Track selection)
    document.querySelectorAll(".selector-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".selector-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedTrack = btn.getAttribute("data-track");
            step2aNext.classList.remove("disabled");
            step2aNext.disabled = false;
        });
    });

    step2aBack.addEventListener("click", () => goToStep(1));
    step2aNext.addEventListener("click", () => {
        startSimulatedLoader();
        goToStep(3);
    });

    // Step 2B (University details)
    step2bBack.addEventListener("click", () => goToStep(1));
    step2bNext.addEventListener("click", () => {
        const instName = document.getElementById("inst-name").value;
        if (!instName) {
            alert("Please enter your Institution Name.");
            return;
        }
        startSimulatedLoader();
        goToStep(3);
    });

    // Step 3 (Simulated loading transitions)
    function startSimulatedLoader() {
        successSpinner.style.display = "block";
        successCheck.style.display = "none";
        
        successTitle.innerText = "Compiling Workspace Config...";
        successText.innerText = "StepCode is loading milestone engines, building secure sandboxes, and auditing code repositories.";

        const loadingStages = [
            "Initializing milestone trackers...",
            "Deploying Docker code evaluation sandboxes...",
            "Connecting with GitHub OAuth integrations...",
            "Syncing Continuous Assessment databases..."
        ];

        let stageIdx = 0;
        const stageInterval = setInterval(() => {
            if (stageIdx < loadingStages.length) {
                successText.innerText = loadingStages[stageIdx];
                stageIdx++;
            } else {
                clearInterval(stageInterval);
                showSuccessState();
            }
        }, 600);
    }

    function showSuccessState() {
        successSpinner.style.display = "none";
        successCheck.style.display = "block";
        
        successTitle.innerText = "Setup Complete!";
        successText.innerHTML = selectedAudience === "student"
            ? `Your <strong>${selectedTrack.toUpperCase()}</strong> workspace is configured. Interactive commits, tracking streaks, and milestone check-ins are active.`
            : `Your University Sandbox environment has been generated. Demo datasets and evaluation dashboards are ready.`;
        
        successActions.style.opacity = 1;
        successActions.style.pointerEvents = "all";
    }

    successFinishBtn.addEventListener("click", () => {
        modal.classList.remove("open");
        
        // Dynamic switch page view based on signup choice to showcase dual-model SaaS
        if (selectedAudience === "student") {
            setMode("student");
            // Scroll to tech-tree
            document.getElementById("tech-tree-section").scrollIntoView();
        } else {
            setMode("university");
            // Scroll to SaaS demo
            document.getElementById("univ-dashboard-section").scrollIntoView();
        }
    });

    // Hamburger menu toggle for mobile
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.querySelector(".nav-links");

    hamburgerBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open-menu");
    });
});
