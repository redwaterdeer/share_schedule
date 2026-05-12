/** styles.css 미로드(경로 깨짐·캐시) 시 모바일에서 PC와 다르게 보이는 문제 보완 */
window.addEventListener("load", () => {
  try {
    const probe = document.createElement("div");
    probe.className = "logo-wrap";
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:absolute!important;left:-9999px!important;top:0!important;width:0!important;height:0!important;overflow:hidden!important;visibility:hidden!important";
    document.documentElement.appendChild(probe);
    const applied = getComputedStyle(probe).display === "grid";
    document.documentElement.removeChild(probe);
    if (applied || document.getElementById("styles-fallback")) return;
    const assetBase = typeof window.__SHARE_SCHEDULE_ASSET_BASE__ === "string" ? window.__SHARE_SCHEDULE_ASSET_BASE__ : "";
    const href = assetBase ? assetBase + "styles.css" : new URL("styles.css", document.baseURI).href;
    fetch(href)
      .then((r) => {
        if (!r.ok) throw new Error("css");
        return r.text();
      })
      .then((text) => {
        if (!text || !String(text).trim() || document.getElementById("styles-fallback")) return;
        const style = document.createElement("style");
        style.id = "styles-fallback";
        style.textContent = text;
        document.head.appendChild(style);
      })
      .catch(() => {});
  } catch {
    /* noop */
  }
});

const KEY_USERS = "share-schedule-users";
const KEY_SESSION = "share-schedule-session";
const KEY_REMEMBER = "share-schedule-remember";
const KEY_SCHEDULES = "share-schedule-list";
const KEY_ROOMS = "share-schedule-rooms";
const KEY_ACTIVE_ROOM = "share-schedule-active-room";
const KEY_ACTIVE_VIEW = "share-schedule-active-view";

const MASTER_ACCOUNT = { id: "redwaterdeer", pw: "10qp29wo!Q" };

const isMasterUserId = (userId) => userId === MASTER_ACCOUNT.id;

const loginView = document.querySelector("#login-view");
const signupView = document.querySelector("#signup-view");
const menuView = document.querySelector("#menu-view");
const createRoomView = document.querySelector("#create-room-view");
const joinRoomView = document.querySelector("#join-room-view");
const calendarView = document.querySelector("#calendar-view");
const sharedFriendView = document.querySelector("#shared-friend-view");
const scheduleCreateView = document.querySelector("#schedule-create-view");
const registeredListView = document.querySelector("#registered-list-view");
const allAccountsView = document.querySelector("#all-accounts-view");
const masterAccountsList = document.querySelector("#master-accounts-list");
const menuMasterFoot = document.querySelector("#menu-master-foot");
const menuAllAccountsBtn = document.querySelector("#menu-all-accounts-btn");
const masterAccountsBackBtn = document.querySelector("#master-accounts-back-btn");
const masterAccountsEditAccountBtn = document.querySelector("#master-accounts-edit-account");
const masterAccountsLogoutBtn = document.querySelector("#master-accounts-logout");
const scheduleView = document.querySelector("#schedule-view");
const loginForm = document.querySelector("#login-form");
const signupBtn = document.querySelector("#signup-btn");
const signupRegisterForm = document.querySelector("#signup-register-form");
const signupPageTitle = document.querySelector("#signup-page-title");
const signupUserIdInput = document.querySelector("#signup-user-id");
const signupUserPwInput = document.querySelector("#signup-user-pw");
const signupCancelBtn = document.querySelector("#signup-cancel-btn");
const rememberCheckbox = document.querySelector("#remember-me");
const currentUserText = document.querySelector("#current-user");
const logoutBtn = document.querySelector("#logout-btn");
const menuLogoutBtn = document.querySelector("#menu-logout-btn");
const editAccountBtn = document.querySelector("#edit-account-btn");
const createRoomBtn = document.querySelector("#create-room-btn");
const joinRoomBtn = document.querySelector("#join-room-btn");
const createRoomForm = document.querySelector("#create-room-form");
const roomNameInput = document.querySelector("#room-name");
const createRoomCancelBtn = document.querySelector("#create-room-cancel");
const createRoomLogoutBtn = document.querySelector("#create-room-logout");
const createRoomEditAccountBtn = document.querySelector("#create-room-edit-account");
const myRoomsList = document.querySelector("#my-rooms-list");
const joinRoomCancelBtn = document.querySelector("#join-room-cancel");
const joinRoomDeleteBtn = document.querySelector("#join-room-delete");
const joinRoomLogoutBtn = document.querySelector("#join-room-logout");
const joinRoomEditAccountBtn = document.querySelector("#join-room-edit-account");
const scheduleCreateForm = document.querySelector("#schedule-create-form");
const scheduleCreateCancelBtn = document.querySelector("#schedule-create-cancel");
const scheduleCreateLogoutBtn = document.querySelector("#schedule-create-logout");
const scheduleCreateEditAccountBtn = document.querySelector("#schedule-create-edit-account");
const scCategoryInput = document.querySelector("#sc-category");
const scDivisionInput = document.querySelector("#sc-division");
const scDateInput = document.querySelector("#sc-date");
const scTitleInput = document.querySelector("#sc-title");
const scContentInput = document.querySelector("#sc-content");
const scheduleCreatePageTitle = document.querySelector("#schedule-create-page-title");
const calendarGrid = document.querySelector("#calendar-grid");
const calRoomNameEl = document.querySelector("#cal-room-name");
const calYearEl = document.querySelector("#cal-year");
const calMonthEl = document.querySelector("#cal-month");
const calArrowBtns = document.querySelectorAll(".ym-arrow");
const calLogoutBtn = document.querySelector("#cal-logout-btn");
const calEditAccountBtn = document.querySelector("#cal-edit-account-btn");
const calHomeBtn = document.querySelector("#cal-home-btn");
const calMembersBtn = document.querySelector("#cal-members-btn");
const calEditBtn = document.querySelector("#cal-edit-btn");
const sharedFriendForm = document.querySelector("#shared-friend-form");
const sharedFriendIdInput = document.querySelector("#shared-friend-id");
const sharedFriendCancelBtn = document.querySelector("#shared-friend-cancel");
const sharedFriendLogoutBtn = document.querySelector("#shared-friend-logout");
const sharedFriendEditAccountBtn = document.querySelector("#shared-friend-edit-account");
const regListBody = document.querySelector("#reg-list-body");
const regListHomeBtn = document.querySelector("#reg-list-home-btn");
const regListPrevBtn = document.querySelector("#reg-list-prev-btn");
const regListEditAccountBtn = document.querySelector("#reg-list-edit-account");
const regListLogoutBtn = document.querySelector("#reg-list-logout");
const scheduleForm = document.querySelector("#schedule-form");
const scheduleList = document.querySelector("#schedule-list");

const load = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const ensureMasterAccount = () => {
  const users = load(KEY_USERS, {});
  if (users[MASTER_ACCOUNT.id] !== MASTER_ACCOUNT.pw) {
    users[MASTER_ACCOUNT.id] = MASTER_ACCOUNT.pw;
    save(KEY_USERS, users);
  }
};

const getUsers = () => {
  const users = load(KEY_USERS, {});
  if (users[MASTER_ACCOUNT.id] !== MASTER_ACCOUNT.pw) {
    users[MASTER_ACCOUNT.id] = MASTER_ACCOUNT.pw;
    save(KEY_USERS, users);
  }
  return users;
};
const getSchedules = () => load(KEY_SCHEDULES, []);

const renderSchedules = (currentUser) => {
  if (!scheduleList) return;
  const schedules = getSchedules();
  scheduleList.innerHTML = "";

  if (schedules.length === 0) {
    const empty = document.createElement("li");
    empty.className = "schedule-item";
    empty.innerHTML = "<p>등록된 일정이 없습니다. 새 일정을 추가해주세요.</p>";
    scheduleList.appendChild(empty);
    return;
  }

  schedules
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .forEach((item) => {
      const li = document.createElement("li");
      li.className = "schedule-item";
      li.innerHTML = `
        <div class="schedule-item-head">
          <h3>${item.title}</h3>
          ${item.owner === currentUser ? `<button class="delete-btn" data-id="${item.id}">삭제</button>` : ""}
        </div>
        <p>일시: ${item.date} ${item.time}</p>
        <p>멤버: ${item.member}</p>
        <p>작성자: ${item.owner}</p>
      `;
      scheduleList.appendChild(li);
    });
};

const setView = (type) => {
  const session = getSession();
  const viewType =
    type === "all-accounts" && !isMasterUserId(session?.userId) ? "menu" : type;

  if (loginView) loginView.classList.toggle("view-active", viewType === "login");
  if (signupView) signupView.classList.toggle("view-active", viewType === "signup");
  if (menuView) menuView.classList.toggle("view-active", viewType === "menu");
  if (createRoomView) createRoomView.classList.toggle("view-active", viewType === "create-room");
  if (joinRoomView) joinRoomView.classList.toggle("view-active", viewType === "join-room");
  if (calendarView) calendarView.classList.toggle("view-active", viewType === "calendar");
  if (sharedFriendView) sharedFriendView.classList.toggle("view-active", viewType === "shared-friend");
  if (scheduleCreateView) scheduleCreateView.classList.toggle("view-active", viewType === "schedule-create");
  if (registeredListView) registeredListView.classList.toggle("view-active", viewType === "registered-list");
  if (allAccountsView) allAccountsView.classList.toggle("view-active", viewType === "all-accounts");
  if (scheduleView) scheduleView.classList.toggle("view-active", viewType === "schedule");

  const persistViews = new Set([
    "menu",
    "create-room",
    "join-room",
    "calendar",
    "shared-friend",
    "schedule-create",
    "registered-list",
    "schedule",
    "signup",
    "all-accounts",
  ]);
  if (session && persistViews.has(viewType)) {
    if (viewType !== "all-accounts" || isMasterUserId(session.userId)) {
      save(KEY_ACTIVE_VIEW, viewType);
    }
  }

  if (viewType === "menu") {
    if (menuMasterFoot) {
      menuMasterFoot.classList.toggle("is-visible", isMasterUserId(session?.userId));
    }
  }
};

const getRooms = () => load(KEY_ROOMS, []);

const calendarState = (() => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
})();

let registeredListDateKey = null;
let editingScheduleId = null;
let scheduleCreateReturnView = null;

const applyScheduleCreatePageTitle = () => {
  if (!scheduleCreatePageTitle) return;
  scheduleCreatePageTitle.textContent =
    editingScheduleId != null ? "일정 수정" : "일정 등록";
};

const isScheduleVisibleToUser = (item, userId, activeRoomId) => {
  if (!item || !item.date || !userId) return false;
  if (isMasterUserId(userId)) return true;
  if ((item.roomId ?? null) !== (activeRoomId ?? null)) return false;
  const division = String(item.division || "").trim();
  if (division === "비공유") return item.owner === userId;
  return true;
};

const buildScheduleCountMap = () => {
  const session = getSession();
  const userId = session?.userId;
  const activeRoom = load(KEY_ACTIVE_ROOM, null);
  const activeRoomId = activeRoom?.roomId ?? null;

  const counts = new Map();
  if (!userId) return counts;

  for (const item of getSchedules()) {
    if (!isScheduleVisibleToUser(item, userId, activeRoomId)) continue;
    counts.set(item.date, (counts.get(item.date) || 0) + 1);
  }
  return counts;
};

const renderRegisteredListForDate = (dateKey) => {
  if (!regListBody) return;
  const session = getSession();
  const activeRoom = load(KEY_ACTIVE_ROOM, null);
  const activeRoomId = activeRoom?.roomId ?? null;
  regListBody.innerHTML = "";

  if (!session || !dateKey) {
    const empty = document.createElement("div");
    empty.className = "reg-list-empty";
    empty.textContent = "등록된 일정이 없습니다.";
    regListBody.appendChild(empty);
    return;
  }

  const items = getSchedules().filter(
    (item) =>
      item?.date === dateKey && isScheduleVisibleToUser(item, session.userId, activeRoomId)
  );

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "reg-list-empty";
    empty.textContent = "등록된 일정이 없습니다.";
    regListBody.appendChild(empty);
    return;
  }

  items.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "ko"));

  for (const item of items) {
    const row = document.createElement("div");
    row.className = "reg-list-row";
    row.setAttribute("role", "listitem");

    const category = item.category || "—";
    const division = String(item.division || "").trim() || "공유";
    const owner = item.owner || "—";
    const title = item.title || "—";
    const content = item.content || "—";

    for (const text of [category, division, owner, title]) {
      const cell = document.createElement("div");
      cell.className = "reg-list-cell";
      cell.textContent = text;
      row.appendChild(cell);
    }

    const contentCell = document.createElement("div");
    contentCell.className = "reg-list-cell reg-list-cell-wide";
    const textWrap = document.createElement("div");
    textWrap.className = "reg-list-content-text";
    textWrap.textContent = content;
    contentCell.appendChild(textWrap);
    row.appendChild(contentCell);

    const remarkCell = document.createElement("div");
    remarkCell.className = "reg-list-cell reg-list-cell-remark";
    if (session && item.owner === session.userId) {
      const actions = document.createElement("div");
      actions.className = "reg-list-remark-actions";
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "reg-list-row-btn reg-list-edit-btn";
      editBtn.textContent = "수정";
      editBtn.dataset.scheduleId = String(item.id);
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "reg-list-row-btn reg-list-del-btn";
      delBtn.textContent = "삭제";
      delBtn.dataset.scheduleId = String(item.id);
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
      remarkCell.appendChild(actions);
    }
    row.appendChild(remarkCell);

    regListBody.appendChild(row);
  }
};

const pad2 = (n) => String(n).padStart(2, "0");

const renderCalendar = () => {
  if (!calendarGrid || !calYearEl || !calMonthEl) return;

  if (calRoomNameEl) {
    const active = load(KEY_ACTIVE_ROOM, null);
    const roomId = active?.roomId;
    const room =
      roomId != null ? getRooms().find((r) => r.id === roomId) : null;
    calRoomNameEl.textContent = room?.name ?? "";
  }

  const { year, month } = calendarState;
  calYearEl.textContent = String(year);
  calMonthEl.textContent = String(month);

  const firstOfMonth = new Date(year, month - 1, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  const counts = buildScheduleCountMap();
  calendarGrid.innerHTML = "";

  for (let row = 0; row < 6; row++) {
    const rowEl = document.createElement("div");
    rowEl.className = "cal-row";

    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;
      const dayNumberInMonth = cellIndex - startWeekday + 1;

      let displayDay;
      let cellYear = year;
      let cellMonth = month;
      let isOut = false;
      if (dayNumberInMonth < 1) {
        displayDay = daysInPrevMonth + dayNumberInMonth;
        cellYear = prevYear;
        cellMonth = prevMonth;
        isOut = true;
      } else if (dayNumberInMonth > daysInMonth) {
        displayDay = dayNumberInMonth - daysInMonth;
        cellYear = nextYear;
        cellMonth = nextMonth;
        isOut = true;
      } else {
        displayDay = dayNumberInMonth;
      }

      const dateKey = `${cellYear}-${pad2(cellMonth)}-${pad2(displayDay)}`;
      const count = counts.get(dateKey) || 0;

      const cell = document.createElement("div");
      cell.className = "cal-cell";
      if (col === 0) cell.classList.add("is-sun");
      if (col === 6) cell.classList.add("is-sat");
      if (isOut) cell.classList.add("is-out");
      cell.dataset.date = dateKey;

      const bar = document.createElement("div");
      bar.className = "cal-bar";
      const dayEl = document.createElement("div");
      dayEl.className = "cal-day";
      dayEl.textContent = String(displayDay);
      cell.appendChild(bar);
      cell.appendChild(dayEl);

      if (count > 0) {
        cell.classList.add("has-schedules");
        const countEl = document.createElement("div");
        countEl.className = "cal-count";
        countEl.textContent = `${count}건`;
        countEl.tabIndex = 0;
        countEl.setAttribute("role", "button");
        countEl.setAttribute("aria-label", `${dateKey} 등록 일정 보기`);
        cell.appendChild(countEl);
      }

      rowEl.appendChild(cell);
    }

    calendarGrid.appendChild(rowEl);
  }
};

const changeCalendar = (target, dir) => {
  const delta = dir === "up" ? 1 : -1;
  if (target === "year") {
    calendarState.year += delta;
  } else if (target === "month") {
    let nextMonth = calendarState.month + delta;
    let nextYear = calendarState.year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    } else if (nextMonth < 1) {
      nextMonth = 12;
      nextYear -= 1;
    }
    calendarState.month = nextMonth;
    calendarState.year = nextYear;
  }
  renderCalendar();
};

const setSession = (userId) => save(KEY_SESSION, { userId });

const getSession = () => load(KEY_SESSION, null);

const clearSession = () => {
  try {
    localStorage.removeItem(KEY_SESSION);
  } catch {
    /* ignore */
  }
};

const saveRemember = (id, pw) => save(KEY_REMEMBER, { id, pw });
const getRemember = () => load(KEY_REMEMBER, null);
const clearRemember = () => {
  try {
    localStorage.removeItem(KEY_REMEMBER);
  } catch {
    /* ignore */
  }
};

let signupScreenMode = "register";

const applySignupScreenUi = () => {
  if (!signupPageTitle || !signupUserIdInput || !signupUserPwInput) return;
  if (signupScreenMode === "edit") {
    signupPageTitle.textContent = "가입 수정";
    signupUserIdInput.readOnly = true;
    signupUserIdInput.required = false;
    signupUserPwInput.required = true;
  } else {
    signupPageTitle.textContent = "신규 가입";
    signupUserIdInput.readOnly = false;
    signupUserIdInput.required = true;
    signupUserPwInput.required = true;
  }
};

const openSignupRegister = () => {
  signupScreenMode = "register";
  if (signupRegisterForm) signupRegisterForm.reset();
  applySignupScreenUi();
  setView("signup");
  signupUserIdInput?.focus();
};

const openSignupEdit = () => {
  const session = getSession();
  if (!session) {
    setView("login");
    return;
  }
  signupScreenMode = "edit";
  if (signupRegisterForm) signupRegisterForm.reset();
  applySignupScreenUi();
  if (signupUserIdInput) signupUserIdInput.value = session.userId;
  if (signupUserPwInput) signupUserPwInput.value = "";
  setView("signup");
  signupUserPwInput?.focus();
};

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const id = String(formData.get("id") || "").trim();
    const pw = String(formData.get("pw") || "").trim();

    const users = getUsers();
    if (!users[id]) {
      alert("등록되지 않은 ID입니다. 신규 가입 후 다시 시도해주세요.");
      return;
    }
    if (users[id] !== pw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (rememberCheckbox && rememberCheckbox.checked) {
      saveRemember(id, pw);
    } else {
      clearRemember();
    }

    if (!setSession(id)) {
      alert(
        "이 브라우저에서 저장을 사용할 수 없어 로그인을 완료할 수 없습니다. 사파리에서 '흔적 없음' 모드를 끄거나, 설정에서 사이트 데이터 저장을 허용한 뒤 다시 시도해 주세요."
      );
      return;
    }
    if (currentUserText) currentUserText.textContent = `${id} 님`;
    renderSchedules(id);
    setView("menu");
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    openSignupRegister();
  });
}

if (signupRegisterForm) {
  signupRegisterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = (signupUserIdInput?.value || "").trim();
    const pw = (signupUserPwInput?.value || "").trim();

    if (signupScreenMode === "edit") {
      const session = getSession();
      if (!session) {
        setView("login");
        return;
      }
      if (!pw) {
        alert("PW를 입력해주세요.");
        signupUserPwInput?.focus();
        return;
      }
      if (id !== session.userId) {
        return;
      }
      const users = getUsers();
      users[id] = pw;
      save(KEY_USERS, users);
      const remembered = getRemember();
      if (remembered && remembered.id === id) {
        saveRemember(id, pw);
      }
      alert("가입 정보가 수정되었습니다.");
      signupScreenMode = "register";
      if (signupRegisterForm) signupRegisterForm.reset();
      if (signupUserIdInput) signupUserIdInput.readOnly = false;
      applySignupScreenUi();
      setView("menu");
      return;
    }

    if (!id || !pw) {
      alert("ID와 PW를 모두 입력해주세요.");
      return;
    }

    const users = getUsers();
    if (users[id]) {
      alert("이미 등록된 ID입니다.");
      signupUserIdInput?.focus();
      return;
    }

    users[id] = pw;
    save(KEY_USERS, users);
    alert("회원가입이 완료되었습니다. 로그인 버튼으로 로그인 해주세요.");
    signupRegisterForm.reset();
    setView("login");
  });
}

if (signupCancelBtn) {
  signupCancelBtn.addEventListener("click", () => {
    const wasEdit = signupScreenMode === "edit";
    signupScreenMode = "register";
    if (signupRegisterForm) signupRegisterForm.reset();
    if (signupUserIdInput) signupUserIdInput.readOnly = false;
    applySignupScreenUi();
    setView(wasEdit ? "menu" : "login");
  });
}

const handleLogout = () => {
  const remembered = getRemember();
  clearSession();
  try {
    localStorage.removeItem(KEY_ACTIVE_VIEW);
  } catch {
    /* ignore */
  }
  if (loginForm) loginForm.reset();
  if (remembered && remembered.id) {
    const idInput = document.querySelector("#user-id");
    const pwInput = document.querySelector("#user-pw");
    if (idInput) idInput.value = remembered.id;
    if (pwInput) pwInput.value = "";
    if (rememberCheckbox) rememberCheckbox.checked = true;
    saveRemember(remembered.id, "");
  } else {
    if (rememberCheckbox) rememberCheckbox.checked = false;
  }
  setView("login");
};

if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout);
}

if (menuLogoutBtn) {
  menuLogoutBtn.addEventListener("click", handleLogout);
}

if (editAccountBtn) {
  editAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (menuAllAccountsBtn) {
  menuAllAccountsBtn.addEventListener("click", () => {
    const s = getSession();
    if (!s || !isMasterUserId(s.userId)) {
      setView("menu");
      return;
    }
    renderMasterAccountsList();
    setView("all-accounts");
  });
}

if (masterAccountsBackBtn) {
  masterAccountsBackBtn.addEventListener("click", () => {
    setView("menu");
  });
}

if (masterAccountsEditAccountBtn) {
  masterAccountsEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (masterAccountsLogoutBtn) {
  masterAccountsLogoutBtn.addEventListener("click", () => {
    handleLogout();
  });
}

if (createRoomBtn) {
  createRoomBtn.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    if (createRoomForm) createRoomForm.reset();
    setView("create-room");
    if (roomNameInput) roomNameInput.focus();
  });
}

const enterRoomFromListItem = (item) => {
  if (!item?.classList.contains("room-list-item")) return;
  const session = getSession();
  if (!session) {
    setView("login");
    return;
  }
  const roomId = Number(item.dataset.roomId);
  if (!Number.isFinite(roomId)) return;
  save(KEY_ACTIVE_ROOM, { roomId });
  renderCalendar();
  setView("calendar");
};

const renderMasterAccountsList = () => {
  if (!masterAccountsList) return;
  masterAccountsList.innerHTML = "";
  const users = getUsers();
  const entries = Object.entries(users);
  const restSorted = entries
    .filter(([id]) => id !== MASTER_ACCOUNT.id)
    .sort(([a], [b]) => a.localeCompare(b, "ko"));
  const masterPair = entries.find(([id]) => id === MASTER_ACCOUNT.id);
  const ordered = masterPair ? [masterPair, ...restSorted] : restSorted;

  ordered.forEach(([id, pw], index) => {
    const row = document.createElement("div");
    row.className = "master-account-row";
    row.setAttribute("role", "listitem");
    row.textContent = `${index + 1}. ID: ${id}  |  PW: ${pw}`;
    masterAccountsList.appendChild(row);
  });
};

const renderMyRooms = () => {
  if (!myRoomsList) return;
  const session = getSession();
  const rooms = getRooms();
  let myRooms = [];
  if (session) {
    if (isMasterUserId(session.userId)) {
      myRooms = [...rooms].sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), "ko")
      );
    } else {
      myRooms = rooms.filter(
        (r) =>
          r.owner === session.userId ||
          (Array.isArray(r.members) && r.members.includes(session.userId))
      );
    }
  }

  myRoomsList.innerHTML = "";

  if (myRooms.length === 0) {
    const empty = document.createElement("li");
    empty.className = "room-list-empty";
    empty.textContent = "소속된 공유방이 없습니다.";
    myRoomsList.appendChild(empty);
    return;
  }

  myRooms.forEach((room, index) => {
    const li = document.createElement("li");
    li.className = "room-list-item";
    li.dataset.roomId = String(room.id);
    li.dataset.owner = room.owner;
    li.tabIndex = 0;
    li.setAttribute("role", "listitem");
    li.setAttribute("aria-label", `${room.name} 공유방으로 입장`);

    const numEl = document.createElement("span");
    numEl.className = "room-list-num";
    numEl.textContent = `${index + 1}.`;

    const nameEl = document.createElement("span");
    nameEl.className = "room-list-name";
    nameEl.textContent = room.name;

    const checkEl = document.createElement("span");
    checkEl.className = "room-list-check";
    checkEl.tabIndex = 0;
    checkEl.setAttribute("role", "checkbox");
    checkEl.setAttribute("aria-checked", "false");
    checkEl.setAttribute("aria-label", `${room.name} 선택`);

    li.appendChild(numEl);
    li.appendChild(nameEl);
    li.appendChild(checkEl);
    myRoomsList.appendChild(li);
  });
};

if (myRoomsList) {
  myRoomsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const check = target.closest(".room-list-check");
    if (check) {
      event.stopPropagation();
      const isOn = check.getAttribute("aria-checked") === "true";
      check.setAttribute("aria-checked", isOn ? "false" : "true");
      check.classList.toggle("is-on", !isOn);
      return;
    }
    const item = target.closest(".room-list-item");
    if (!item) return;
    enterRoomFromListItem(item);
  });

  myRoomsList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains("room-list-check")) {
      event.preventDefault();
      const isOn = target.getAttribute("aria-checked") === "true";
      target.setAttribute("aria-checked", isOn ? "false" : "true");
      target.classList.toggle("is-on", !isOn);
      return;
    }
    const item = target.closest(".room-list-item");
    if (!item) return;
    event.preventDefault();
    enterRoomFromListItem(item);
  });
}

if (joinRoomBtn) {
  joinRoomBtn.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    renderMyRooms();
    setView("join-room");
  });
}

if (joinRoomCancelBtn) {
  joinRoomCancelBtn.addEventListener("click", () => {
    setView("menu");
  });
}

if (joinRoomDeleteBtn) {
  joinRoomDeleteBtn.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    if (!myRoomsList) return;
    const items = [...myRoomsList.querySelectorAll(".room-list-item")].filter((el) => {
      const cb = el.querySelector(".room-list-check");
      return cb && cb.getAttribute("aria-checked") === "true";
    });
    if (items.length === 0) {
      alert("삭제할 공유방을 선택해주세요.");
      return;
    }
    const notOwner = items.filter((el) => el.dataset.owner !== session.userId);
    if (notOwner.length > 0) {
      alert("공유방을 삭제할 수 있는 권한은 개설자에게만 있습니다.");
      return;
    }
    const idsToRemove = new Set(items.map((el) => Number(el.dataset.roomId)).filter(Number.isFinite));
    const rooms = getRooms().filter((r) => !idsToRemove.has(r.id));
    save(KEY_ROOMS, rooms);
    const activeRoom = load(KEY_ACTIVE_ROOM, null);
    if (activeRoom?.roomId != null && idsToRemove.has(activeRoom.roomId)) {
      localStorage.removeItem(KEY_ACTIVE_ROOM);
    }
    renderMyRooms();
  });
}

if (joinRoomLogoutBtn) {
  joinRoomLogoutBtn.addEventListener("click", () => {
    handleLogout();
  });
}

if (joinRoomEditAccountBtn) {
  joinRoomEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (createRoomForm) {
  createRoomForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }

    const name = (roomNameInput?.value || "").trim();
    if (!name) {
      alert("공유방 이름을 입력해주세요.");
      roomNameInput?.focus();
      return;
    }

    const rooms = getRooms();
    if (rooms.some((r) => r.name === name)) {
      alert("이미 같은 이름의 공유방이 있습니다.");
      return;
    }

    rooms.push({
      id: Date.now(),
      name,
      owner: session.userId,
      members: [session.userId],
      createdAt: new Date().toISOString(),
    });
    save(KEY_ROOMS, rooms);

    createRoomForm.reset();
    renderCalendar();
    setView("calendar");
  });
}

if (createRoomCancelBtn) {
  createRoomCancelBtn.addEventListener("click", () => {
    if (createRoomForm) createRoomForm.reset();
    setView("menu");
  });
}

if (createRoomLogoutBtn) {
  createRoomLogoutBtn.addEventListener("click", () => {
    if (createRoomForm) createRoomForm.reset();
    handleLogout();
  });
}

if (createRoomEditAccountBtn) {
  createRoomEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

calArrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    const dir = btn.dataset.dir;
    if (!target || !dir) return;
    changeCalendar(target, dir);
  });
});

if (calLogoutBtn) {
  calLogoutBtn.addEventListener("click", handleLogout);
}

if (calEditAccountBtn) {
  calEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (calHomeBtn) {
  calHomeBtn.addEventListener("click", () => {
    setView("menu");
  });
}

if (calMembersBtn) {
  calMembersBtn.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    if (sharedFriendForm) sharedFriendForm.reset();
    setView("shared-friend");
    sharedFriendIdInput?.focus();
  });
}

if (sharedFriendForm) {
  sharedFriendForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    const activeRoom = load(KEY_ACTIVE_ROOM, null);
    const activeRoomId = activeRoom?.roomId;
    if (activeRoomId == null) {
      alert("입장 중인 공유방이 없습니다.");
      return;
    }
    const friendId = (sharedFriendIdInput?.value || "").trim();
    if (!friendId) {
      alert("공유 친구 ID를 입력해주세요.");
      sharedFriendIdInput?.focus();
      return;
    }
    if (friendId === session.userId) {
      alert("본인 ID는 입력할 수 없습니다.");
      return;
    }
    const users = getUsers();
    if (!users[friendId]) {
      alert("등록되지 않은 ID입니다.");
      return;
    }
    const rooms = getRooms();
    const room = rooms.find((r) => r.id === activeRoomId);
    if (!room) {
      alert("공유방 정보를 찾을 수 없습니다.");
      return;
    }
    if (!Array.isArray(room.members)) room.members = [];
    if (room.members.includes(friendId)) {
      alert("이미 공유방에 참여 중인 친구입니다.");
      return;
    }
    room.members.push(friendId);
    save(KEY_ROOMS, rooms);
    sharedFriendForm.reset();
    alert(
      `${friendId} 님을 공유방 멤버로 추가했습니다. 상대는 [공유방 입장]에서 이 공유방을 선택해 같은 방에서 일정을 확인·작성할 수 있습니다. 본인이 등록한 일정만 수정·삭제할 수 있습니다.`
    );
    setView("calendar");
  });
}

if (sharedFriendCancelBtn) {
  sharedFriendCancelBtn.addEventListener("click", () => {
    if (sharedFriendForm) sharedFriendForm.reset();
    setView("calendar");
  });
}

if (sharedFriendLogoutBtn) {
  sharedFriendLogoutBtn.addEventListener("click", () => {
    if (sharedFriendForm) sharedFriendForm.reset();
    handleLogout();
  });
}

if (sharedFriendEditAccountBtn) {
  sharedFriendEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (calEditBtn) {
  calEditBtn.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    editingScheduleId = null;
    scheduleCreateReturnView = "calendar";
    if (scheduleCreateForm) scheduleCreateForm.reset();
    applyScheduleCreatePageTitle();
    setView("schedule-create");
    if (scCategoryInput) scCategoryInput.focus();
  });
}

if (calendarGrid) {
  calendarGrid.addEventListener("click", (event) => {
    const t = event.target;
    if (!(t instanceof HTMLElement)) return;
    const countEl = t.closest(".cal-count");
    if (!countEl) return;
    const cell = countEl.closest(".cal-cell");
    const dateKey = cell?.dataset?.date;
    if (!dateKey) return;
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    registeredListDateKey = dateKey;
    renderRegisteredListForDate(dateKey);
    setView("registered-list");
  });

  calendarGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const t = event.target;
    if (!(t instanceof HTMLElement) || !t.classList.contains("cal-count")) return;
    event.preventDefault();
    const cell = t.closest(".cal-cell");
    const dateKey = cell?.dataset?.date;
    if (!dateKey) return;
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    registeredListDateKey = dateKey;
    renderRegisteredListForDate(dateKey);
    setView("registered-list");
  });
}

if (regListBody) {
  regListBody.addEventListener("click", (event) => {
    const t = event.target;
    if (!(t instanceof HTMLElement)) return;
    const editBtn = t.closest(".reg-list-edit-btn");
    const delBtn = t.closest(".reg-list-del-btn");
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }
    if (editBtn) {
      const id = Number(editBtn.dataset.scheduleId);
      if (!Number.isFinite(id)) return;
      const item = getSchedules().find((s) => s.id === id && s.owner === session.userId);
      if (!item) return;
      editingScheduleId = item.id;
      scheduleCreateReturnView = "registered-list";
      if (scheduleCreateForm) scheduleCreateForm.reset();
      if (scDateInput) scDateInput.value = item.date || "";
      if (scCategoryInput) {
        const cat = item.category || "";
        const vals = [...scCategoryInput.options].map((o) => o.value);
        scCategoryInput.value = vals.includes(cat) ? cat : "기타";
      }
      if (scDivisionInput) {
        const d = String(item.division || "").trim();
        scDivisionInput.value = d === "비공유" ? "비공유" : "공유";
      }
      if (scTitleInput) scTitleInput.value = item.title || "";
      if (scContentInput) scContentInput.value = item.content || "";
      applyScheduleCreatePageTitle();
      setView("schedule-create");
      scTitleInput?.focus();
      return;
    }
    if (delBtn) {
      const id = Number(delBtn.dataset.scheduleId);
      if (!Number.isFinite(id)) return;
      const schedules = getSchedules();
      if (!schedules.some((s) => s.id === id && s.owner === session.userId)) return;
      const next = schedules.filter((s) => !(s.id === id && s.owner === session.userId));
      save(KEY_SCHEDULES, next);
      if (registeredListDateKey) renderRegisteredListForDate(registeredListDateKey);
      renderCalendar();
    }
  });
}

if (scheduleCreateForm) {
  scheduleCreateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }

    const category = (scCategoryInput?.value || "").trim();
    const division = (scDivisionInput?.value || "").trim();
    const date = scDateInput?.value || "";
    const title = (scTitleInput?.value || "").trim();
    const content = (scContentInput?.value || "").trim();

    if (!title) {
      alert("제목을 입력해주세요.");
      scTitleInput?.focus();
      return;
    }

    const backToRegisteredList = scheduleCreateReturnView === "registered-list";

    const activeRoom = load(KEY_ACTIVE_ROOM, null);
    const schedules = getSchedules();

    if (editingScheduleId != null) {
      const idx = schedules.findIndex(
        (s) => s.id === editingScheduleId && s.owner === session.userId
      );
      if (idx === -1) {
        alert("수정할 일정을 찾을 수 없습니다.");
        editingScheduleId = null;
        scheduleCreateReturnView = null;
        applyScheduleCreatePageTitle();
        return;
      }
      const prev = schedules[idx];
      schedules[idx] = {
        ...prev,
        category,
        division,
        date,
        title,
        content,
      };
      editingScheduleId = null;
    } else {
      schedules.push({
        id: Date.now(),
        roomId: activeRoom?.roomId ?? null,
        category,
        division,
        date,
        title,
        content,
        owner: session.userId,
      });
    }
    save(KEY_SCHEDULES, schedules);

    scheduleCreateReturnView = null;
    scheduleCreateForm.reset();
    applyScheduleCreatePageTitle();
    renderCalendar();
    if (backToRegisteredList) {
      if (registeredListDateKey) renderRegisteredListForDate(registeredListDateKey);
      setView("registered-list");
    } else {
      setView("calendar");
    }
  });
}

if (scheduleCreateCancelBtn) {
  scheduleCreateCancelBtn.addEventListener("click", () => {
    const backToRegisteredList = scheduleCreateReturnView === "registered-list";
    scheduleCreateReturnView = null;
    editingScheduleId = null;
    if (scheduleCreateForm) scheduleCreateForm.reset();
    applyScheduleCreatePageTitle();
    if (backToRegisteredList && registeredListDateKey) {
      renderRegisteredListForDate(registeredListDateKey);
      setView("registered-list");
    } else {
      setView("calendar");
    }
  });
}

if (scheduleCreateLogoutBtn) {
  scheduleCreateLogoutBtn.addEventListener("click", () => {
    scheduleCreateReturnView = null;
    editingScheduleId = null;
    if (scheduleCreateForm) scheduleCreateForm.reset();
    applyScheduleCreatePageTitle();
    handleLogout();
  });
}

if (scheduleCreateEditAccountBtn) {
  scheduleCreateEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (regListHomeBtn) {
  regListHomeBtn.addEventListener("click", () => {
    setView("menu");
  });
}

if (regListPrevBtn) {
  regListPrevBtn.addEventListener("click", () => {
    renderCalendar();
    setView("calendar");
  });
}

if (regListEditAccountBtn) {
  regListEditAccountBtn.addEventListener("click", () => {
    openSignupEdit();
  });
}

if (regListLogoutBtn) {
  regListLogoutBtn.addEventListener("click", () => {
    handleLogout();
  });
}

if (scheduleForm) {
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    if (!session) {
      setView("login");
      return;
    }

    const title = document.querySelector("#schedule-title").value.trim();
    const date = document.querySelector("#schedule-date").value;
    const time = document.querySelector("#schedule-time").value;
    const member = document.querySelector("#schedule-member").value.trim();

    if (!title || !date || !time || !member) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const schedules = getSchedules();
    schedules.push({
      id: Date.now(),
      title,
      date,
      time,
      member,
      owner: session.userId,
    });
    save(KEY_SCHEDULES, schedules);
    scheduleForm.reset();
    renderSchedules(session.userId);
  });
}

if (scheduleList) {
  scheduleList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    if (!target.classList.contains("delete-btn")) return;

    const id = Number(target.dataset.id);
    const session = getSession();
    const schedules = getSchedules();
    const next = schedules.filter((s) => !(s.id === id && s.owner === session?.userId));
    save(KEY_SCHEDULES, next);
    if (session) renderSchedules(session.userId);
  });
}

const boot = () => {
  ensureMasterAccount();

  const remembered = getRemember();
  if (remembered) {
    const idInput = document.querySelector("#user-id");
    const pwInput = document.querySelector("#user-pw");
    if (idInput) idInput.value = remembered.id || "";
    if (pwInput) pwInput.value = remembered.pw || "";
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  const session = getSession();
  if (!session) {
    setView("login");
    return;
  }
  if (currentUserText) currentUserText.textContent = `${session.userId} 님`;
  renderSchedules(session.userId);

  const allowedViews = new Set([
    "menu",
    "create-room",
    "join-room",
    "calendar",
    "shared-friend",
    "schedule-create",
    "registered-list",
    "schedule",
    "signup",
    "all-accounts",
  ]);
  const savedRaw = load(KEY_ACTIVE_VIEW, null);
  let target = typeof savedRaw === "string" && allowedViews.has(savedRaw) ? savedRaw : "menu";
  if (target === "registered-list") {
    target = "calendar";
  }
  if (target === "all-accounts" && !isMasterUserId(session.userId)) {
    target = "menu";
  }

  if (target === "calendar") {
    renderCalendar();
  }
  if (target === "join-room") {
    renderMyRooms();
  }
  if (target === "all-accounts") {
    renderMasterAccountsList();
  }

  if (savedRaw === "signup") {
    openSignupEdit();
  } else {
    setView(target);
  }
};

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  const session = getSession();
  if (!session || !calendarView?.classList.contains("view-active")) return;
  renderCalendar();
});

boot();
