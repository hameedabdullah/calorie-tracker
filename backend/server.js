const express = require("express");
const cors = require("cors");
const db = require("./db")
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// 1)))) post - signup route idhu

app.post("/signup", async (req,res)=>{
     console.log("Signup route called");
    const { username, email, password } = req.body;

     if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

     try {
        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        //  Return a success response
        return res.status(201).json({ message: "Signup successful! You can now log in." });

    } 
    
    
    catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "An error occurred during signup" });
    }
});


//2) login route - post uh


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ 
                message: "Login successful!",
                user: {
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.status(400).json({ error: "Invalid email or password" });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "An error occurred during login" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// IDHU FOOD MASTER
app.get("/food-master", async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM food_master");
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});




app.post("/food-master", async (req, res) => {
    const { food_name, unit, calories_per_unit, image_url } = req.body;
    try {
        await db.query(
            "INSERT INTO food_master (food_name, unit, calories_per_unit, image_url) VALUES (?, ?, ?, ?)",
            [food_name, unit, calories_per_unit, image_url]
        );
        res.json({ message: "Food Item Added" });
    } catch (err) {
        res.status(500).json(err);
    }
});




app.put("/food-master/:id", async (req, res) => {
    const { id } = req.params;
    const { food_name, unit, calories_per_unit, image_url } = req.body;
    try {
        await db.query(
            "UPDATE food_master SET food_name = ?, unit = ?, calories_per_unit = ?, image_url = ? WHERE id = ?",
            [food_name, unit, calories_per_unit, image_url, id]
        );
        res.json({ message: "Food Item Updated" });
    } catch (err) {
        res.status(500).json(err);
    }
});





app.delete("/food-master/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM food_master WHERE id = ?", [id]);
        res.json({ message: "Food Item Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});


// THIS EXERCISE MASTER CRUD 
app.get("/exercise-master", async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM exercise_master");
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/exercise-master", async (req, res) => {
    const { exercise_name, unit, calories_per_unit, image_url } = req.body;
    try {
        await db.query(
            "INSERT INTO exercise_master (exercise_name, unit, calories_per_unit, image_url) VALUES (?, ?, ?, ?)",
            [exercise_name, unit, calories_per_unit, image_url]
        );
        res.json({ message: "Exercise Item Added" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put("/exercise-master/:id", async (req, res) => {
    const { id } = req.params;
    const { exercise_name, unit, calories_per_unit, image_url } = req.body;
    try {
        await db.query(
            "UPDATE exercise_master SET exercise_name = ?, unit = ?, calories_per_unit = ?, image_url = ? WHERE id = ?",
            [exercise_name, unit, calories_per_unit, image_url, id]
        );
        res.json({ message: "Exercise Item Updated" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete("/exercise-master/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM exercise_master WHERE id = ?", [id]);
        res.json({ message: "Exercise Item Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});



//Food EnTRies API CRUD.........


app.get("/food-entries", async (req, res) => {

    try {
        const [result] = await db.query(`
            SELECT food_entries.*, food_master.food_name FROM food_entries 
            JOIN food_master ON food_entries.food_id = food_master.id 
            ORDER BY food_entries.id DESC
        `);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});



app.post("/food-entries", async (req, res) => {
    const { food_id, unit, quantity } = req.body;
    
        const qty = parseFloat(quantity);
        const [foodRows] = await db.query("SELECT * FROM food_master WHERE id = ?", [food_id]);
        //note la project la backend calculation writing la e
        if (foodRows.length === 0) { 
            return res.status(404).json({ error: "Food item not found" });
        }
        const foodItem = foodRows[0];

        let convertedQuantity = qty;
        if (unit === "kg") {
            convertedQuantity = qty * 1000;
        }
        if (unit === "l") {
            convertedQuantity = qty * 1000;
        }
        if (unit === "g") {
            convertedQuantity = qty;
        }
        if (unit === "ml") {
            convertedQuantity = qty;
        }

        const calculatedCalories = convertedQuantity * foodItem.calories_per_unit;

        await db.query(
            "INSERT INTO food_entries (food_id, unit, quantity, calories) VALUES (?, ?, ?, ?)",
            [food_id, unit, qty, calculatedCalories]
        );
        res.json({ message: "Food Entry Added" });
    
});


app.put("/food-entries/:id", async (req, res) => {
    const { id } = req.params;
    const { food_id, unit, quantity } = req.body;
    
        const qty = parseFloat(quantity);
        const [foodRows] = await db.query("SELECT * FROM food_master WHERE id = ?", [food_id]);
        if (foodRows.length === 0) {
            return res.status(404).json({ error: "Food item not found" });
        }
        const foodItem = foodRows[0];

        let convertedQuantity = qty;
        if (unit === "kg") {
            convertedQuantity = qty * 1000;
        }
        if (unit === "l") {
            convertedQuantity = qty * 1000;
        }
        if (unit === "g") {
            convertedQuantity = qty;
        }
        if (unit === "ml") {
            convertedQuantity = qty;
        }

        const calculatedCalories = convertedQuantity * foodItem.calories_per_unit;

        await db.query(
            "UPDATE food_entries SET food_id = ?, unit = ?, quantity = ?, calories = ? WHERE id = ?",
            [food_id, unit, qty, calculatedCalories, id]
        );
        res.json({ message: "Food Entry Updated" });
   
});

app.delete("/food-entries/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM food_entries WHERE id = ?", [id]);
        res.json({ message: "Food Entry Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});
