import { useState } from "react";

// All dates from the menu, mapped to week number
// Format: "YYYY-MM-DD" -> weekNumber
const menuDates = {
  // Week 1
  "2026-04-20": 1, "2026-05-11": 1, "2026-06-01": 1, "2026-06-22": 1,
  "2026-08-10": 1, "2026-08-31": 1, "2026-09-21": 1, "2026-10-19": 1,
  "2026-11-19": 1, "2026-11-30": 1,
  "2027-01-04": 1, "2027-01-25": 1, "2027-02-15": 1, "2027-03-08": 1, "2027-03-29": 1,

  // Week 2
  "2026-04-27": 2, "2026-05-18": 2, "2026-06-08": 2,
  "2026-08-17": 2, "2026-09-07": 2, "2026-09-28": 2, "2026-10-26": 2,
  "2026-11-16": 2, "2026-12-07": 2,
  "2027-01-11": 2, "2027-02-01": 2, "2027-02-22": 2, "2027-03-15": 2,

  // Week 3
  "2026-05-04": 3, "2026-05-25": 3, "2026-06-15": 3,
  "2026-08-24": 3, "2026-09-14": 3, "2026-10-05": 3, "2026-11-02": 3,
  "2026-11-23": 3, "2026-12-14": 3,
  "2027-01-18": 3, "2027-02-08": 3, "2027-03-01": 3, "2027-03-22": 3,
};

const menu = {
  1: {
    Monday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Quorn Hot Dog & Onions in a Finger Roll with Diced Potatoes (V)",
        "Cheese & Tomato Quiche with Potatoes (V)",
        "Baked Potato & Baked Beans (V)",
      ],
    },
    Tuesday: {
      soup: "Minestrone Soup & Bread (V)",
      choices: [
        "Chicken Tikka with Boiled Rice",
        "Fish Fingers with Oven Chips or Potatoes",
        "Egg Mayo Sandwich or Roll (V)",
      ],
    },
    Wednesday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Beef Lasagne with Crusty Bread",
        "Chicken Meatballs in Spicy Tomato Sauce in a Roll",
        "Cheese Toastie (V)",
      ],
    },
    Thursday: {
      soup: "Carrot & Coriander Soup & Bread (V)",
      choices: [
        "Roast Chicken, Yorkshire Pudding with Roast Potatoes",
        "Cheese Sandwich or Roll (V)",
        "Tuna Pasta Crunch",
      ],
    },
    Friday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Tomato Pasta with Crusty Bread (V)",
        "Turkey Sandwich or Roll",
        "Sausage Cowboy Beans with Potatoes",
      ],
    },
  },
  2: {
    Monday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Macaroni Cheese with Crusty Bread (V)",
        "Vegetable Curry with Boiled Rice (V)",
        "Cheese Toastie (V)",
      ],
    },
    Tuesday: {
      soup: "Vegetable & Rice Soup & Bread (V)",
      choices: [
        "Sausages in Gravy with Potatoes",
        "Baked Potato with Coleslaw (V)",
        "Chicken Sandwich or Roll",
      ],
    },
    Wednesday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Chicken Curry with Boiled Rice",
        "Tuna Pasta Salad",
        "Quorn Goujons Salad Wrap (V)",
      ],
    },
    Thursday: {
      soup: "Tomato Soup & Bread (V)",
      choices: [
        "Beef Mince Pie with Potatoes",
        "Quorn Hot Dog & Onions in a Finger Roll with Potato Wedges (V)",
        "Tuna Mayo Sandwich or Roll",
      ],
    },
    Friday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Breaded Fish with Potatoes",
        "Turkey Sandwich or Roll",
        "Quorn Mayo Sandwich or Roll (V)",
      ],
    },
  },
  3: {
    Monday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Omelette with Potatoes (V)",
        "Soft Cheese Sandwich or Roll with Banana (V)",
        "Cheese & Tomato Pizza with Pasta (V)",
      ],
    },
    Tuesday: {
      soup: "Carrot & Coriander Soup & Bread (V)",
      choices: [
        "Chicken Burger in a Bun with Diced Potatoes",
        "Baked Potato with Tuna Mayo",
        "Cheese Toastie (V)",
      ],
    },
    Wednesday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Beef Spaghetti Bolognaise with Crusty Bread",
        "Chicken Sandwich or Roll",
        "Baked Potato Vegetable Bolognaise (V)",
      ],
    },
    Thursday: {
      soup: "Scotch Broth & Bread (V)",
      choices: [
        "Fish Fingers with Oven Chips or Potatoes",
        "Quorn Curry with Boiled Rice (V)",
        "Turkey Sandwich or Roll",
      ],
    },
    Friday: {
      soup: "Lentil Soup & Bread (V)",
      choices: [
        "Beef Burger in a Bun with Diced Potatoes",
        "Dhal with Boiled Rice (V)",
        "Tuna Mayo Sandwich or Roll",
      ],
    },
  },
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function toLocalDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Given a date, find what week and day it falls in by finding the nearest Monday
function getMenuForDate(date) {
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon ... 5=Fri, 6=Sat
  if (dayOfWeek === 0 || dayOfWeek === 6) return null; // weekend

  // Find Monday of this week
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek - 1));
  const mondayStr = toLocalDateStr(monday);

  const weekNum = menuDates[mondayStr];
  if (!weekNum) return null;

  const dayName = DAYS[dayOfWeek - 1];
  return { weekNum, dayName, dayData: menu[weekNum][dayName] };
}

function getWeekMenuForDate(date) {
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const mondayStr = toLocalDateStr(monday);
  const weekNum = menuDates[mondayStr];
  if (!weekNum) return null;
  return { weekNum, monday };
}

export default function App() {
  const today = new Date();
  const [view, setView] = useState("today"); // "today" | "tomorrow" | "week" | "nextWeek"

  function getTargetDate() {
    if (view === "tomorrow") {
      const d = new Date(today);
      d.setDate(d.getDate() + 1);
      // skip weekend
      if (d.getDay() === 6) d.setDate(d.getDate() + 2);
      if (d.getDay() === 0) d.setDate(d.getDate() + 1);
      return d;
    }
    return today;
  }

  const targetDate = getTargetDate();
  const isWeekView = view === "week" || view === "nextWeek";
  const dayResult = !isWeekView ? getMenuForDate(targetDate) : null;
  const currentWeek = isWeekView ? getWeekMenuForDate(today) : null;
  const weekResult = currentWeek && view === "nextWeek"
    ? getWeekMenuForDate(new Date(currentWeek.monday.getFullYear(), currentWeek.monday.getMonth(), currentWeek.monday.getDate() + 7))
    : currentWeek;
  const weekTitle = view === "nextWeek" ? "Next Week" : "This Week";

  const isVeg = (text) => text.includes("(V)");

  const formatDate = (d) =>
    d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  const formatWeekRange = (monday) => {
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    return `${monday.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${friday.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef9ec 0%, #fff8e1 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "#1a1a2e",
        padding: "24px 20px 20px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>🍽️</div>
        <h1 style={{
          margin: 0,
          color: "#ffd700",
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textShadow: "0 2px 8px rgba(255,215,0,0.3)",
        }}>School Dinners</h1>
        <p style={{ margin: "6px 0 0", color: "#aaa", fontSize: 13 }}>
          Glasgow City Council · FuelZone Primary Menu
        </p>
        <a
          href="https://www.glasgow.gov.uk/media/6813/Primary-ASL-Menu-2026-27/pdf/FZ_Primary_ASL_Menu_2026-2027.pdf?m=1776343294150"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 12,
            padding: "6px 14px",
            background: "rgba(255,215,0,0.12)",
            border: "1px solid rgba(255,215,0,0.35)",
            borderRadius: 20,
            color: "#ffd700",
            fontSize: 12,
            textDecoration: "none",
            letterSpacing: "0.3px",
            transition: "background 0.2s",
          }}
        >
          📄 View Full Menu PDF
        </a>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: "flex",
        background: "#16213e",
        borderBottom: "3px solid #ffd700",
      }}>
        {[
          { key: "today", label: "Today" },
          { key: "tomorrow", label: "Tomorrow" },
          { key: "week", label: "This Week" },
          { key: "nextWeek", label: "Next Week" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            style={{
              flex: 1,
              padding: "14px 8px",
              background: view === key ? "#ffd700" : "transparent",
              color: view === key ? "#1a1a2e" : "#ccc",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "clamp(13px, 3vw, 16px)",
              fontWeight: view === key ? "bold" : "normal",
              transition: "all 0.2s",
              letterSpacing: "0.3px",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 40px" }}>

        {/* TODAY / TOMORROW */}
        {!isWeekView && (
          <>
            <p style={{
              textAlign: "center",
              color: "#666",
              fontSize: 14,
              margin: "0 0 20px",
              fontStyle: "italic",
            }}>
              {formatDate(targetDate)}
            </p>

            {!dayResult ? (
              <div style={{
                background: "white",
                borderRadius: 16,
                padding: "40px 24px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "2px dashed #ddd",
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
                <h2 style={{ margin: "0 0 8px", color: "#333", fontSize: 20 }}>No School Dinner</h2>
                <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
                  {targetDate.getDay() === 0 || targetDate.getDay() === 6
                    ? "It's the weekend!"
                    : "This date isn't on the menu cycle. It may be a holiday."}
                </p>
              </div>
            ) : (
              <div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: 20,
                }}>
                  <span style={{
                    background: "#1a1a2e",
                    color: "#ffd700",
                    borderRadius: 20,
                    padding: "5px 16px",
                    fontSize: 13,
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}>Week {dayResult.weekNum}</span>
                  <span style={{ color: "#999", fontSize: 13 }}>{dayResult.dayName}</span>
                </div>

                {/* Soup */}
                <MenuCard
                  emoji="🍲"
                  label="Soup of the Day"
                  items={[dayResult.dayData.soup]}
                  accent="#e8f4f8"
                  accentBorder="#b3d9e8"
                />

                {/* Choices */}
                <MenuCard
                  emoji="🍽️"
                  label="Your Choices"
                  items={dayResult.dayData.choices}
                  accent="#fff9e6"
                  accentBorder="#ffd700"
                  showNumbers
                />

                {/* Always included */}
                <div style={{
                  background: "#f0f7f0",
                  border: "1px solid #b8ddb8",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginTop: 12,
                  fontSize: 13,
                  color: "#4a7a4a",
                  lineHeight: 1.7,
                }}>
                  <strong>✓ Always included:</strong> Yoghurt & fresh fruit · Seasonal veg or side salad · Semi-skimmed milk or water
                </div>
              </div>
            )}
          </>
        )}

        {/* WEEK VIEW */}
        {isWeekView && (
          <>
            {!weekResult ? (
              <div style={{
                background: "white",
                borderRadius: 16,
                padding: "40px 24px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "2px dashed #ddd",
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
                <h2 style={{ margin: "0 0 8px", color: "#333", fontSize: 20 }}>No Menu {weekTitle}</h2>
                <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
                  {weekTitle} isn't on the menu cycle — it may be a school holiday.
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: 20,
                }}>
                  <span style={{
                    background: "#1a1a2e",
                    color: "#ffd700",
                    borderRadius: 20,
                    padding: "5px 16px",
                    fontSize: 13,
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}>Week {weekResult.weekNum}</span>
                  <span style={{ color: "#888", fontSize: 13 }}>{weekTitle} · {formatWeekRange(weekResult.monday)}</span>
                </div>

                {DAYS.map((day, i) => {
                  const dayDate = new Date(weekResult.monday);
                  dayDate.setDate(weekResult.monday.getDate() + i);
                  const isToday = view === "week" && toLocalDateStr(dayDate) === toLocalDateStr(today);
                  const dayData = menu[weekResult.weekNum][day];

                  return (
                    <div key={day} style={{
                      background: "white",
                      borderRadius: 14,
                      marginBottom: 12,
                      boxShadow: isToday
                        ? "0 0 0 3px #ffd700, 0 4px 16px rgba(255,215,0,0.2)"
                        : "0 2px 10px rgba(0,0,0,0.07)",
                      overflow: "hidden",
                      border: isToday ? "none" : "1px solid #eee",
                    }}>
                      <div style={{
                        background: isToday ? "#1a1a2e" : "#f5f5f5",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}>
                        <span style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          color: isToday ? "#ffd700" : "#333",
                        }}>{day}</span>
                        {isToday && (
                          <span style={{
                            background: "#ffd700",
                            color: "#1a1a2e",
                            fontSize: 10,
                            fontWeight: "bold",
                            padding: "2px 8px",
                            borderRadius: 10,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}>Today</span>
                        )}
                        <span style={{
                          marginLeft: "auto",
                          fontSize: 12,
                          color: isToday ? "#aaa" : "#888",
                        }}>
                          {dayDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <div style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
                          🍲 {dayData.soup}
                        </div>
                        {dayData.choices.map((choice, ci) => (
                          <div key={ci} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            padding: "5px 0",
                            borderTop: ci > 0 ? "1px solid #f0f0f0" : "1px solid #f0f0f0",
                            fontSize: 13,
                            color: "#333",
                          }}>
                            <span style={{
                              background: isVeg(choice) ? "#4caf50" : "#ff7043",
                              color: "white",
                              borderRadius: 10,
                              padding: "2px 8px",
                              fontSize: 11,
                              fontWeight: "bold",
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                              marginTop: 1,
                            }}>
                              {`OPT ${ci + 1}${isVeg(choice) ? " (VEG)" : ""}`}
                            </span>
                            <span>{choice.replace(" (V)", "")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div style={{
                  background: "#f0f7f0",
                  border: "1px solid #b8ddb8",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginTop: 4,
                  fontSize: 13,
                  color: "#4a7a4a",
                  lineHeight: 1.7,
                }}>
                  <strong>✓ Every day includes:</strong> Yoghurt & fresh fruit · Seasonal veg or side salad · Semi-skimmed milk or water
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function MenuCard({ emoji, label, items, accent, accentBorder, showNumbers }) {
  const isVeg = (text) => text.includes("(V)");

  return (
    <div style={{
      background: accent,
      border: `2px solid ${accentBorder}`,
      borderRadius: 14,
      padding: "16px",
      marginBottom: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{
          fontWeight: "bold",
          fontSize: 14,
          color: "#333",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>{label}</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: showNumbers && i > 0 ? "10px 0 0" : showNumbers ? "0" : "4px 0",
          borderTop: showNumbers && i > 0 ? `1px solid ${accentBorder}` : "none",
        }}>
          {showNumbers && (
            <span style={{
              background: isVeg(item) ? "#4caf50" : "#ff7043",
              color: "white",
              borderRadius: 10,
              padding: "2px 8px",
              fontSize: 11,
              fontWeight: "bold",
              flexShrink: 0,
              whiteSpace: "nowrap",
              marginTop: 2,
            }}>
              OPT {i + 1}{isVeg(item) ? " (VEG)" : ""}
            </span>
          )}
          <span style={{
            fontSize: 14,
            color: "#333",
            lineHeight: 1.5,
            flex: 1,
          }}>
            {item.replace(" (V)", "")}
            {!showNumbers && isVeg(item) && (
              <span style={{
                marginLeft: 6,
                background: "#4caf50",
                color: "white",
                fontSize: 10,
                padding: "1px 5px",
                borderRadius: 4,
                fontWeight: "bold",
              }}>V</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
