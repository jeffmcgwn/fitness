// Listen for submit
document.getElementById('bmi-form').addEventListener('submit', function(e) {

    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Hide fat
    document.getElementById('fat').style.display = 'none'
        // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

// Calculate Results
function calculateResults() {
    console.log('Calculating...')
        // UI Vars
    const weight = document.getElementById('weight');
    const feet = document.getElementById('feet');
    const inches = document.getElementById('inches');
    const status = document.getElementById('status');
    const advice = document.getElementById('advice');

    const wt = Math.abs(parseFloat(weight.value));
    const ft = Math.abs(parseFloat(feet.value));
    const inch = Math.abs(parseFloat(inches.value));

    const inchCalc = ft * 12;
    const totalInch = inchCalc + inch;
    // Compute BMI
    const bmiCalc = (703 * wt) / (totalInch * totalInch);

    // Calorie Intake Variables
    const activity = document.getElementById('activity');
    const sex = document.getElementById('sex');
    const goal = document.getElementById('goal');
    const age = document.getElementById('age');

    const loss = document.getElementById('loss');
    const maintain = document.getElementById('maintain');
    const gain = document.getElementById('gain');

    // More Math
    const howOld = Math.abs(parseFloat(age.value));
    const cm = totalInch * 2.54;
    const kg = wt * 0.453592;
    const mbmr = parseInt(((10 * kg) + (6.25 * cm) - (5 * howOld) + 5).toFixed(0));
    const fbmr = parseInt(((10 * kg) + (6.25 * cm) - (5 * howOld) - 161).toFixed(0));

    if (isFinite(wt)) {
        bmi.value = bmiCalc.toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';
        // Show pic
        document.getElementById('fat').style.display = 'block'
            // Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers')
    }

    if (sex.value == "male") {
        if (activity.value == 1) {
            loss.value = parseInt((mbmr * 1.2) * .78);
            maintain.value = parseInt(mbmr * 1.2);
            gain.value = parseInt((mbmr * 1.2) * 1.11);
        } else if (activity.value == 2) {
            loss.value = parseInt((mbmr * 1.375) * .78);
            maintain.value = parseInt(mbmr * 1.375);
            gain.value = parseInt((mbmr * 1.375) * 1.11);
        } else if (activity.value == 3) {
            loss.value = parseInt((mbmr * 1.465) * .78);
            maintain.value = parseInt(mbmr * 1.465);
            gain.value = parseInt((mbmr * 1.465) * 1.11);
        } else if (activity.value == 4) {
            loss.value = parseInt((mbmr * 1.725) * .78);
            maintain.value = parseInt(mbmr * 1.725);
            gain.value = parseInt((mbmr * 1.725) * 1.11);
        } else if (activity.value == 5) {
            loss.value = parseInt((mbmr * 1.9) * .78);
            maintain.value = parseInt(mbmr * 1.9);
            gain.value = parseInt((mbmr * 1.9) * 1.11);
        }
    } else if (sex.value == "female") {
        if (activity.value == 1) {
            loss.value = parseInt((fbmr * 1.2) * .78);
            maintain.value = parseInt(fbmr * 1.2);
            gain.value = parseInt((fbmr * 1.2) * 1.11);
        } else if (activity.value == 2) {
            loss.value = parseInt((fbmr * 1.375) * .78);
            maintain.value = parseInt(fbmr * 1.375);
            gain.value = parseInt((fbmr * 1.375) * 1.11);
        } else if (activity.value == 3) {
            loss.value = parseInt((fbmr * 1.465) * .78);
            maintain.value = parseInt(fbmr * 1.465);
            gain.value = parseInt((fbmr * 1.465) * 1.11);
        } else if (activity.value == 4) {
            loss.value = parseInt((fbmr * 1.725) * .78);
            maintain.value = parseInt(fbmr * 1.725);
            gain.value = parseInt((fbmr * 1.725) * 1.11);
        } else if (activity.value == 5) {
            loss.value = parseInt((fbmr * 1.9) * .78);
            maintain.value = parseInt(fbmr * 1.9);
            gain.value = parseInt((fbmr * 1.9) * 1.11);
        }
    } else {
        showError('Please select a sex');
    }

    if (bmi.value <= 18.5) {
        status.value = "You are underweight";
        advice.innerText = `I'd recommend carbing up. You're only ${(18.5 - bmi.value).toFixed(0)} points away from a healthy weight, and I think some more bread and pasta in a healthy balanced diet can really help you get to a healthy weight. Talk to your doctor.`
        resources.innerHTML = `<a href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/underweight/faq-20058429">A Simple Guide to Gaining Weight by the Mayo Clinic</a><br><a href="https://www.bodybuilding.com/content/how-to-gain-weight.html">The Complete Guide to Gaining Weight</a>`;

    } else if (bmi.value > 18.5 && bmi.value < 24.9) {
        status.value = "You are average weight!";
        advice.innerText = `I don't have much advice for you, other than to consume around ${maintain.value} calories per day to keep looking as good as you do! Keep it up!`
        resources.innerHTML = `<a href="https://www.amazon.com/QiMH-Vertical-Lighted-Aluminum-Rectangle/dp/B07KBZ7CTR/ref=sr_1_8?dchild=1&keywords=body+mirror&qid=1586267244&sr=8-8">Here's a nice mirror since you look so good.</a>`
    } else if (bmi.value > 24.9 && bmi.value < 29.9) {
        status.value = "You are overweight";
        advice.innerText = `You're 'overweight', but don't let that terminology be too discouraging. Most people in America are overweight and it's mostly what you'd assume 'average' would be. My advice though is simply cut out some carbs, avoid sugars and maintain regular exercise. Maybe even go Paleo, a lot of people have found success in that, and I'll throw a link below for you. You're only about ${Math.abs(bmi.value - 24.9).toFixed(0)} points above what you should be for 'normal' status, so don't fret. Pasta is overrated anyway ;-)`
        resources.innerHTML = `<a href="https://www.healthline.com/nutrition/paleo-diet-meal-plan-and-menu">A Beginner's Guide to the Paleo Diet</a>`;

    } else if (bmi.value >= 30 && bmi.value < 199.9) {
        status.value = "You are obese";
        advice.innerText = `You are about ${Math.abs(bmi.value - 24.9).toFixed(0)} points above 'normal'. I'm sure you're aware of the health risks, as I'm sure enough people have mentioned them as if you don't know already. The good news here is, if you're willing, you can drop the first several pounds rather easily. I'd recommend going keto or even paleo. Cut out carbs and sugars as much as possible and be militant about it. After the first few weeks you'll see an initial drop that should be motivating enough for you to continue. There are plenty of resources to guide you through your journey, and I have provided a few links for you below. Either way, talk to your doctor. Best of luck!`
        resources.innerHTML = `<a href="https://www.healthline.com/nutrition/ketogenic-diet-101#sample-meal-plan">A Beginner's Guide to Keto</a><br><a href="https://www.dietdoctor.com/low-carb/keto">Diet Doctor's Guide to Keto</a><br><a href="https://www.healthline.com/nutrition/paleo-diet-meal-plan-and-menu">A Beginner's Guide to the Paleo Diet</a>`;
    } else if (bmi.value >= 200) {
        status.value = "Idk dude, you're probably dead or something. I'd check my numbers if I were you.";
        advice.innerText = `I'm not sure what advice I can give you other than to check your numbers or go to the doctor. God speed.`
        resources.innerHTML = `<a href="https://www.longstreetclinic.com/what-is-obesity/">What is Morbid Obesity?</a>`
    }

    if (bmi.value <= 18.5) {
        document.getElementById("fatpic").innerHTML = "<img class='animated slideInLeft' src='img/underweight.png' width='65%' height='65%'>";

    } else if (bmi.value > 18.5 && bmi.value < 24.9) {
        document.getElementById("fatpic").innerHTML = "<img class='animated slideInLeft' src='img/normal.png' width='65%' height='65%'>";
    } else if (bmi.value > 24.9 && bmi.value < 29.9) {
        document.getElementById("fatpic").innerHTML = "<img class='animated slideInLeft' src='img/fat.png' width='65%' height='65%'>";
    } else if (bmi.value >= 30 && bmi.value < 199.9) {
        document.getElementById("fatpic").innerHTML = "<img class='animated slideInLeft' src='img/vfat.png' width='65%' height='65%'>";
    } else if (bmi.value >= 200) {
        document.getElementById("fatpic").innerHTML = "<img class='animated slideInLeft' src='img/casket.png' width='65%' height='65%'>";
    }

    if (inches.value > 12) {
        showError('You cannot put that many inches');
    }




    // Show Error
    function showError(error) {
        // Hide Results
        document.getElementById('results').style.display = 'none';
        // Hide Loader
        document.getElementById('loading').style.display = 'none';
        // Hide pic
        document.getElementById('fat').style.display = 'none';
        // Create a div
        const errorDiv = document.createElement('div');

        // Get elements
        const card = document.querySelector('.card');
        const heading = document.querySelector('.animated');

        // Add class
        errorDiv.className = 'alert alert-danger';

        // Create text node and append to div
        errorDiv.appendChild(document.createTextNode(error));

        // Insert error above heading
        card.insertBefore(errorDiv, heading);

        // Clear error after 3 seconds
        setTimeout(clearError, 3000);
    }

    // Clear error
    function clearError() {
        document.querySelector('.alert').remove();
    }
}