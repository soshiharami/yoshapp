from datetime import datetime, timedelta

def score_calculate(bet_time, wake_up_time):
    bed_time_str = bet_time
    wake_time_str = wake_up_time
    bed_time = datetime.strptime(bed_time_str, '%H:%M')
    wake_time = datetime.strptime(wake_time_str, '%H:%M')

    # 日付を跨いだ場合を考慮
    if wake_time <= bed_time:
        wake_time += timedelta(days=1)

    ideal_time = 25200  # 7 hours in seconds
    sleep_hours = (wake_time - bed_time).total_seconds()
    sleep_deficit = abs(sleep_hours - ideal_time)
    score = max(0, ((ideal_time - sleep_deficit) / ideal_time) * 10000)
    return float(score)

# テスト例
print(score_calculate("23:00", "06:00"))  # 期待されるスコア
print(score_calculate("23:30", "07:30"))  # 期待されるスコア
print(score_calculate("01:00", "09:00"))  # 期待されるスコア
