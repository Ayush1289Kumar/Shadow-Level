// ─────────────────────────────────────────────────────────────────────────────
// strings.ts — Solo Leveling-themed UI string constants for Shadow Level
// Import STRINGS in routes instead of using inline string literals.
// ─────────────────────────────────────────────────────────────────────────────

export const STRINGS = {
  auth: {
    title: "SHADOW LEVEL",
    subtitle_login: "Return to the shadow army.",
    subtitle_signup: "Awaken your power.",
    cta_login: "Enter the Realm",
    cta_signup: "Arise",
    switch_to_signup: "Awaken here.",
    switch_to_login: "Already a hunter?",
    no_account: "No account?",
    already_hunter: "Already a hunter?",
    toast_signup: "Arise. Welcome to the Shadow Army, hunter.",
    toast_login: "Welcome back, hunter.",
    toast_error: "Authentication failed.",
  },

  dashboard: {
    title: "TODAY'S QUESTS",
    empty_title: "No Active Quests",
    empty_desc: "Head to the Dungeon Forge to create your first habit.",
    go_to_forge: "Open Dungeon Forge",
    penalty_title: "⚠ PENALTY ZONE ACTIVE",
    penalty_desc:
      "You failed to complete 75% of your quests yesterday. The System demands discipline.",
    penalty_dismiss: "Acknowledge",
    level_up_toast: (level: number) => `[NOTICE] LEVEL UP: LV. ${level}`,
    stat_points_label: "UNALLOCATED STAT POINTS",
    stat_points_available: (n: number) =>
      `You have ${n} stat point${n !== 1 ? "s" : ""} to allocate.`,
    shadow_army_title: "SHADOW ARMY",
    dungeon_rank_title: "DUNGEON RANK",
    streak_label: "Current Streak",
    longest_streak_label: "Longest Streak",
    complete_toast: (name: string, exp: number) =>
      `Quest complete: ${name} (+${exp} EXP)`,
    undo_toast: (name: string, exp: number) =>
      `Quest reversed: ${name} (-${exp} EXP)`,
  },

  habits: {
    page_title: "DUNGEON FORGE",
    page_subtitle: "Forge your daily quests and shape your power.",
    create_cta: "Forge New Habit",
    edit_cta: "Edit",
    delete_cta: "Delete",
    save_cta: "Save Changes",
    cancel_cta: "Cancel",
    empty_state: "No habits forged. Enter the Dungeon Forge to begin.",
    name_label: "Habit Name",
    description_label: "Description (optional)",
    type_label: "Type",
    type_positive: "Positive (gain EXP)",
    type_negative: "Negative (lose EXP)",
    exp_label: "EXP Value",
    frequency_label: "Frequency",
    freq_daily: "Daily",
    freq_weekly: "Weekly",
    freq_monthly: "Monthly",
    create_toast: "New habit forged.",
    update_toast: "Habit updated.",
    delete_toast: "Habit removed from the forge.",
  },

  rewards: {
    page_title: "SHADOW TREASURY",
    page_subtitle: "Claim rewards with the EXP you have earned, hunter.",
    create_cta: "Add Reward",
    purchase_cta: "Claim",
    delete_cta: "Remove",
    empty_state: "No rewards defined. Add something worthy of your power.",
    name_label: "Reward Name",
    description_label: "Description (optional)",
    cost_label: "EXP Cost",
    purchased_label: "Claimed",
    create_toast: "Reward added to the treasury.",
    purchase_toast: "Reward claimed from the treasury.",
    delete_toast: "Reward removed.",
    insufficient_exp: "Insufficient EXP. Keep hunting.",
  },

  analytics: {
    page_title: "HUNTER RECORDS",
    page_subtitle: "Track your growth through the ranks.",
    weekly_chart_title: "7-Day EXP Earned",
    pie_chart_title: "Quest Breakdown",
    heatmap_title: "90-Day Activity",
    no_data: "No records yet. Complete quests to see your growth.",
  },

  profile: {
    page_title: "HUNTER STATUS",
    username_label: "Hunter Name",
    avatar_label: "Avatar",
    avatar_upload_cta: "Upload Shadow Sigil",
    avatar_uploading: "Channeling shadow energy...",
    save_cta: "Update Status",
    public_profile_label: "Public Profile Link",
    copy_link_cta: "Copy Link",
    copy_link_toast: "Profile link copied to clipboard.",
    save_toast: "Hunter status updated.",
    penalty_config_title: "Penalty Configuration",
    stats_title: "STATS",
    danger_title: "DANGER ZONE",
    sign_out_cta: "Abandon Realm",
    sign_out_toast: "You have left the shadow realm.",
    stat_strength: "Strength",
    stat_agility: "Agility",
    stat_intelligence: "Intelligence",
  },

  ranks: {
    E: "E-Rank",
    D: "D-Rank",
    C: "C-Rank",
    B: "B-Rank",
    A: "A-Rank",
    S: "S-Rank",
  } as Record<string, string>,

  shadows: {
    igris: { name: "Igris", title: "Knight of Shadows", unlock: 5, buff: "+5% EXP" },
    tank: { name: "Tank", title: "Iron Shadow", unlock: 15, buff: "Dungeon Pass" },
    beru: { name: "Beru", title: "Shadow Marshal", unlock: 30, buff: "+20% EXP" },
  },

  errors: {
    boundary_title: "[ SYSTEM FATAL ERROR ]",
    boundary_desc: "An unknown Gate has opened. The dungeon is unstable.",
    boundary_detail: "The System has encountered an unrecoverable anomaly.",
    boundary_cta: "ARISE",
  },

  nav: {
    dashboard: "Daily Quests",
    habits: "Dungeon Forge",
    rewards: "Treasury",
    analytics: "Records",
    profile: "Hunter Status",
  },
} as const;
