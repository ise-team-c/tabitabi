import json
from pathlib import Path

from flask import Blueprint, redirect, render_template, request, url_for

DATA_DIR_PATH = Path(__file__).parent.parent.resolve() / "data"

bp = Blueprint("plan", __name__)


@bp.route("/")
def index():
    plan_name = "beppu"
    plan_dir_path = DATA_DIR_PATH / "yamasato" / plan_name
    dates = sorted(p.stem for p in plan_dir_path.glob("*.json"))
    plan_info = {}
    for date in dates:
        json_path = plan_dir_path / f"{date}.json"
        with json_path.open("r") as f:
            plan_info_per_day = json.load(f)
        plan_info[date] = plan_info_per_day["plan"]

    return render_template(
        "plan/index.html", plan_name=plan_name, dates=dates, plan_info=plan_info
    )


@bp.route("/create", methods=("GET", "POST"))
def create():
    if request.method == "POST":
        # Read existing plans
        if not DATA_DIR_PATH.exists():
            DATA_DIR_PATH.mkdir()

        plan_dir_path = DATA_DIR_PATH / "yamasato" / request.json["plan_name"]
        if not plan_dir_path.exists():
            plan_dir_path.mkdir(parents=True)

        json_path = plan_dir_path / f"{request.json['date']}.json"
        if json_path.exists():
            with json_path.open("r") as f:
                plan_info = json.load(f)
        else:
            plan_info = {"plan": []}

        for event_info in request.json["plan"]:
            plan_info["plan"].append(event_info)

        with json_path.open("w") as f:
            json.dump(plan_info, f, indent=4)

        return redirect(url_for("plan.index"))

    return render_template("plan/create.html")
