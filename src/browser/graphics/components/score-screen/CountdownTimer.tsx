import React, {useState, useEffect} from "react";
import {useReplicant} from "../../../use-replicant";

interface CountdownTimerProps {
	className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({className}) => {
	const game = useReplicant("game");
	const [timeRemaining, setTimeRemaining] = useState<string>("");

	useEffect(() => {
		if (!game?.timerTargetTime) {
			setTimeRemaining("");
			return;
		}

		const updateTimer = () => {
			const now = new Date();
			if (!game.timerTargetTime) {
				return;
			}
			const [targetHours, targetMinutes] = game.timerTargetTime
				.split(":")
				.map(Number);

			// Create target time for today
			const targetTime = new Date();
			targetTime.setHours(targetHours, targetMinutes, 0, 0);

			// If target time has passed today, set it for tomorrow
			if (targetTime <= now) {
				targetTime.setDate(targetTime.getDate() + 1);
			}

			const timeDiff = targetTime.getTime() - now.getTime();

			if (timeDiff <= 0) {
				setTimeRemaining("00:00:00");
				return;
			}

			const hours = Math.floor(timeDiff / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

			setTimeRemaining(formattedTime);
		};

		// Update immediately
		updateTimer();

		// Set up interval to update every second
		const interval = setInterval(updateTimer, 1000);

		return () => clearInterval(interval);
	}, [game?.timerTargetTime]);

	if (!game?.timerTargetTime || !timeRemaining) {
		return null;
	}

	return (
		<div
			className={className}
			style={{
				textAlign: "center",
				fontSize: "48px",
				fontWeight: "bold",
				color: "#fff",
				fontFamily: "ConduitITC, times new roman, serif",
				textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
				marginBottom: "20px",
			}}
		>
			{timeRemaining}
		</div>
	);
};
