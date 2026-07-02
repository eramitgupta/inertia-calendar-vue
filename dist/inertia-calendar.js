import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, isRef as l, mergeProps as u, nextTick as d, normalizeClass as f, normalizeProps as p, normalizeStyle as m, openBlock as h, reactive as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, toRef as x, unref as S, vModelSelect as C, vModelText as w, watch as T, withDirectives as E, withKeys as D, withModifiers as O } from "vue";
import { useHttp as k } from "@inertiajs/vue3";
//#region src/constants.ts
var A = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], j = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], M = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
], N = [
	"#378ADD",
	"#1D9E75",
	"#D85A30",
	"#D4537E",
	"#7F77DD",
	"#BA7517",
	"#E24B4A",
	"#444441"
], P = [
	"month",
	"week",
	"day",
	"agenda"
], F = (e) => String(e).padStart(2, "0"), I = (e) => `${e.getFullYear()}-${F(e.getMonth() + 1)}-${F(e.getDate())}`, L = (e) => {
	if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
	let [t = 1970, n = 1, r = 1] = String(e).split("-").map(Number);
	return new Date(t, n - 1, r);
}, R = (e) => {
	let [t = 0, n = 0] = B(e).split(":").map(Number);
	return t * 60 + n;
}, z = (e) => {
	let [t = 0, n = 0] = B(e).split(":").map(Number), r = t >= 12 ? "pm" : "am";
	return `${t % 12 || 12}${n ? `:${F(n)}` : ""}${r}`;
}, B = (e) => {
	let t = String(e || "00:00").trim(), n = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
	if (!n) return t.slice(0, 5);
	let r = Number(n[1] || 0), i = Number(n[2] || 0), a = n[3]?.toLowerCase();
	return a === "pm" && r < 12 && (r += 12), a === "am" && r === 12 && (r = 0), `${F(r)}:${F(i)}`;
}, V = (e) => `${j[e.getDay()]}, ${A[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`, H = (e) => `${A[e.getMonth()]} ${e.getFullYear()}`, U = (e) => {
	let t = new Date(e);
	t.setDate(t.getDate() - t.getDay());
	let n = new Date(t);
	return n.setDate(n.getDate() + 6), t.getMonth() === n.getMonth() ? `${A[t.getMonth()]} ${t.getDate()}-${n.getDate()}, ${t.getFullYear()}` : `${A[t.getMonth()]} ${t.getDate()} - ${A[n.getMonth()]} ${n.getDate()}`;
};
function ee(e = {}) {
	let n = t(() => "value" in e ? e.value : e), r = /* @__PURE__ */ new Date(), i = _(n.value.initialDate ? L(n.value.initialDate) : new Date(r.getFullYear(), r.getMonth(), r.getDate())), a = _(new Date(i.value.getFullYear(), i.value.getMonth(), 1)), o = _(n.value.initialView || "month"), s = _(n.value.sidebarOpen ?? !0), c = _(""), l = _([...n.value.calendars || []]), u = _([...n.value.events || []]), d = _(new Set(l.value.map((e) => e.id)));
	T(() => n.value.events, (e) => {
		Array.isArray(e) && (u.value = [...e]);
	}), T(() => n.value.calendars, (e) => {
		Array.isArray(e) && e.length && (l.value = [...e], d.value = new Set(e.map((e) => e.id)));
	}), T(() => n.value.sidebarOpen, (e) => {
		typeof e == "boolean" && (s.value = e);
	});
	let f = t(() => o.value === "month" ? H(i.value) : o.value === "week" ? U(i.value) : o.value === "day" ? V(i.value) : "Agenda"), p = t(() => u.value.filter((e) => d.value.has(e.cal) ? !c.value || e.title.toLowerCase().includes(c.value.toLowerCase()) : !1)), m = () => Math.max(0, ...u.value.map((e) => Number(e.id)).filter(Number.isFinite)) + 1;
	return {
		calendars: l,
		currentDate: i,
		currentView: o,
		events: u,
		filteredEvents: p,
		miniDate: a,
		search: c,
		sidebarOpen: s,
		title: f,
		visibleCalendars: d,
		deleteEvent: (e) => {
			u.value = u.value.filter((t) => String(t.id) !== String(e.id));
		},
		formatLongDate: V,
		formatMonthYear: H,
		formatTime: z,
		formatWeekRange: U,
		goToday: () => {
			let e = /* @__PURE__ */ new Date();
			i.value = new Date(e.getFullYear(), e.getMonth(), e.getDate());
		},
		navigate: (e) => {
			let t = new Date(i.value);
			o.value === "month" ? i.value = new Date(t.getFullYear(), t.getMonth() + e, 1) : o.value === "week" ? (t.setDate(t.getDate() + e * 7), i.value = t) : o.value === "day" ? (t.setDate(t.getDate() + e), i.value = t) : (t.setDate(t.getDate() + e * 14), i.value = t);
		},
		saveEvent: (e) => {
			if (e.id) return u.value = u.value.map((t) => String(t.id) === String(e.id) ? e : t), e;
			let t = {
				...e,
				id: m()
			};
			return u.value = [...u.value, t], t;
		},
		selectDate: (e) => {
			i.value = L(e);
		},
		setView: (e) => {
			o.value = e;
		},
		toggleCalendar: (e) => {
			let t = new Set(d.value);
			t.has(e) ? t.delete(e) : t.add(e), d.value = t;
		}
	};
}
//#endregion
//#region src/composables/useCalendarModal.ts
function te(e, t, n) {
	let r = _(!1), i = _("create"), a = _(""), o = _(null);
	return {
		closeModal: () => {
			r.value = !1, o.value = null;
		},
		modalMode: i,
		modalOpen: r,
		openCreate: (n) => {
			t() && (a.value = n || I(e.value), o.value = null, i.value = "create", r.value = !0);
		},
		openDetail: (e) => {
			o.value = e, i.value = "detail", r.value = !0;
		},
		openEdit: (e) => {
			n() && (o.value = e, i.value = "edit");
		},
		selectedDate: a,
		selectedEvent: o
	};
}
//#endregion
//#region src/composables/useCalendarMutations.ts
function ne({ calendar: e, canDelete: t, closeModal: n, emit: r, inertiaEvents: i, shouldPersist: a }) {
	let o = (t) => t.id && e.events.value.some((e) => String(e.id) === String(t.id)) ? e.saveEvent(t) : (e.events.value = [...e.events.value, t], t), s = (t, i) => {
		let a = i ? e.saveEvent(t) : o(t);
		i ? r.update(a) : r.create(a), n();
	};
	return {
		deleteEvent: (o) => {
			if (t()) {
				if (!a.value) {
					e.deleteEvent(o), r.delete(o), n();
					return;
				}
				i.deleteEvent(o).then((t) => {
					t && (e.deleteEvent(o), r.delete(o), n());
				});
			}
		},
		saveEvent: (e) => {
			let t = !!e.id;
			if (!a.value) {
				s(e, t);
				return;
			}
			(t ? i.updateEvent(e) : i.createEvent(e)).then((n) => {
				n && s(n.event || e, t);
			});
		}
	};
}
//#endregion
//#region src/composables/useCalendarResource.ts
function re(e) {
	let n = t(() => e.resource || e.calendar), r = t(() => ({
		...e.config,
		...n.value?.config || {}
	})), i = t(() => ({
		create: !0,
		update: !0,
		delete: !0,
		...e.permissions,
		...n.value?.permissions || {}
	})), a = t(() => ({
		...e.routes,
		...n.value?.routes || {}
	})), o = t(() => n.value?.mentionUsers || e.mentionUsers || []), s = t(() => !!(a.value.create || a.value.store || a.value.update || a.value.delete || a.value.destroy)), c = t(() => !!(e.persistWithInertia || s.value));
	return {
		calendarOptions: t(() => ({
			calendars: n.value?.data?.calendars || e.calendars,
			events: n.value?.data?.events || e.events,
			initialDate: e.initialDate,
			initialView: e.initialView,
			sidebarOpen: r.value.sidebar
		})),
		config: r,
		hasRoutes: s,
		mentionUsers: o,
		permissions: i,
		resource: n,
		routes: a,
		shouldPersist: c
	};
}
//#endregion
//#region src/composables/useInertiaCalendarEvents.ts
var ie = {
	create: null,
	store: null,
	update: null,
	delete: null,
	destroy: null
}, W = (e, t) => typeof e == "function" ? e(t) : e && t?.id ? e.replace(":id", String(t.id)) : e || null;
function ae(e = {}, n = {}) {
	let r = {
		...ie,
		...e
	}, i = k({}), a = t(() => i.errors), o = t(() => i.processing), s = (e, t, r = {}, a = {}) => t ? (i.transform(() => r), i[e](t, {
		...n,
		...a
	}).catch(() => null)) : Promise.resolve(null);
	return {
		errors: a,
		processing: o,
		createEvent: (e, t = {}) => s("post", W(r.create || r.store, e), e, t),
		updateEvent: (e, t = {}) => s("put", W(r.update, e), e, t),
		deleteEvent: (e, t = {}) => s("delete", W(r.delete || r.destroy, e), {}, t)
	};
}
//#endregion
//#region src/composables/useEventLayout.ts
var G = 48, K = (e) => e.id ?? `${e.date}-${e.start}-${e.title}`, q = (e, t = 20) => ({
	top: `${R(e.start) * G / 60}px`,
	height: `${Math.max((R(e.end) - R(e.start)) * G / 60, t)}px`,
	background: `${e.color}22`,
	color: e.color,
	borderLeft: `3px solid ${e.color}`
}), J = (e) => [...e].sort((e, t) => R(e.start) - R(t.start)), Y = (e, t) => {
	let n = typeof t == "string" ? t : I(t);
	return J(e.filter((e) => e.date === n));
};
function X() {
	return {
		hours: t(() => Array.from({ length: 24 }, (e, t) => t)),
		nowTop: t(() => {
			let e = /* @__PURE__ */ new Date();
			return (e.getHours() * 60 + e.getMinutes()) * G / 60;
		})
	};
}
//#endregion
//#region src/composables/useAgendaGroups.ts
function oe(e, n) {
	return { groupedEvents: t(() => {
		let t = new Date(e()), r = new Date(t);
		r.setDate(r.getDate() + 14);
		let i = /* @__PURE__ */ new Map();
		return n().filter((e) => {
			let n = L(e.date);
			return n >= t && n <= r;
		}).sort((e, t) => `${e.date} ${e.start}`.localeCompare(`${t.date} ${t.start}`)).forEach((e) => {
			let t = i.get(e.date) || [];
			i.set(e.date, J([...t, e]));
		}), Array.from(i.entries()).map(([e, t]) => ({
			date: e,
			events: t,
			isToday: e === I(/* @__PURE__ */ new Date())
		}));
	}) };
}
//#endregion
//#region src/components/AgendaView.vue?vue&type=script&setup=true&lang.ts
var se = {
	key: 0,
	class: "erag-agenda-wrap"
}, ce = ["onClick"], le = { class: "erag-atime" }, ue = { class: "erag-atitle" }, de = {
	key: 0,
	class: "erag-adesc"
}, fe = {
	key: 1,
	class: "erag-empty"
}, pe = /* @__PURE__ */ c({
	__name: "AgendaView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["detail"],
	setup(t) {
		let n = t, { groupedEvents: o } = oe(() => n.currentDate, () => n.events);
		return (t, n) => S(o).length ? (h(), i("div", se, [(h(!0), i(e, null, v(S(o), (n) => (h(), i("div", {
			key: n.date,
			class: "erag-agenda-group"
		}, [a("div", { class: f(["erag-agenda-date", { "erag-today-hdr": n.isToday }]) }, b(S(V)(S(L)(n.date))), 3), (h(!0), i(e, null, v(n.events, (e) => (h(), i("div", {
			key: S(K)(e),
			class: "erag-agenda-ev",
			onClick: (n) => t.$emit("detail", e)
		}, [
			a("div", {
				class: "erag-acolor",
				style: m({ background: e.color })
			}, null, 4),
			a("div", le, b(S(z)(e.start)) + " - " + b(S(z)(e.end)), 1),
			a("div", null, [a("div", ue, b(e.title), 1), e.desc ? (h(), i("div", de, b(e.desc), 1)) : r("", !0)])
		], 8, ce))), 128))]))), 128))])) : (h(), i("div", fe, "No events"));
	}
}), me = (e) => String(e).padStart(2, "0");
function he(e, n) {
	let r = t(() => `${A[n().getMonth()].slice(0, 3)} ${n().getFullYear()}`);
	return {
		miniDays: t(() => {
			let t = n().getFullYear(), r = n().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r + 1, 0).getDate(), o = I(/* @__PURE__ */ new Date()), s = I(e()), c = [];
			for (let e = 0; e < i; e += 1) c.push({
				label: new Date(t, r, -(i - e - 1)).getDate(),
				other: !0
			});
			for (let e = 1; e <= a; e += 1) {
				let n = `${t}-${me(r + 1)}-${me(e)}`;
				c.push({
					date: n,
					label: e,
					selected: n === s,
					today: n === o
				});
			}
			return c;
		}),
		miniTitle: r,
		parseMiniDate: (e) => L(e)
	};
}
//#endregion
//#region src/components/CalendarSidebar.vue?vue&type=script&setup=true&lang.ts
var ge = { class: "erag-mini-header" }, _e = { class: "erag-mini-title" }, ve = { style: {
	display: "flex",
	gap: "3px"
} }, ye = { class: "erag-mini-grid" }, be = ["onClick"], xe = ["onClick"], Se = /* @__PURE__ */ c({
	__name: "CalendarSidebar",
	props: {
		calendars: {},
		currentDate: {},
		miniDate: {},
		open: {
			type: Boolean,
			default: !0
		},
		visibleCalendars: {}
	},
	emits: [
		"add",
		"mini-next",
		"mini-prev",
		"select-date",
		"toggle-calendar"
	],
	setup(t) {
		let n = t, { miniDays: r, miniTitle: o, parseMiniDate: s } = he(() => n.currentDate, () => n.miniDate);
		return (n, c) => (h(), i("div", { class: f(["erag-sidebar", { "erag-collapsed": !t.open }]) }, [
			a("div", null, [a("div", ge, [a("span", _e, b(S(o)), 1), a("div", ve, [a("button", {
				class: "erag-mini-nav",
				onClick: c[0] ||= (e) => n.$emit("mini-prev")
			}, "‹"), a("button", {
				class: "erag-mini-nav",
				onClick: c[1] ||= (e) => n.$emit("mini-next")
			}, "›")])]), a("div", ye, [(h(!0), i(e, null, v(S(M), (e) => (h(), i("div", {
				key: e,
				class: "erag-mini-dow"
			}, b(e), 1))), 128)), (h(!0), i(e, null, v(S(r), (e, t) => (h(), i("div", {
				key: `${e.date || "other"}-${t}`,
				class: f(["erag-mini-day", {
					"erag-other": e.other,
					"erag-today": e.today,
					"erag-selected": e.selected
				}]),
				onClick: (t) => e.date && n.$emit("select-date", S(s)(e.date))
			}, b(e.label), 11, be))), 128))])]),
			a("div", null, [c[3] ||= a("div", { class: "erag-legend-label" }, "Calendars", -1), a("div", null, [(h(!0), i(e, null, v(t.calendars, (e) => (h(), i("div", {
				key: e.id,
				class: "erag-legend-item",
				onClick: (t) => n.$emit("toggle-calendar", e.id)
			}, [a("div", {
				class: "erag-legend-dot",
				style: m({ background: t.visibleCalendars.has(e.id) ? e.color : "#ccc" })
			}, null, 4), a("span", { style: m({ color: t.visibleCalendars.has(e.id) ? "#1a1a1a" : "#bbb" }) }, b(e.label), 5)], 8, xe))), 128))])]),
			a("div", null, [a("button", {
				class: "erag-btn erag-btn-primary",
				style: {
					width: "100%",
					"justify-content": "center"
				},
				onClick: c[2] ||= (e) => n.$emit("add")
			}, "+ New event")])
		], 2));
	}
}), Z = (e) => e.target.value, Ce = { class: "erag-toolbar" }, we = { class: "erag-toolbar-left" }, Te = { class: "erag-cal-title" }, Ee = { class: "erag-toolbar-right" }, De = { class: "erag-search-bar" }, Oe = ["value"], ke = { class: "erag-view-tabs" }, Ae = ["onClick"], je = ["value"], Me = ["value"], Ne = /* @__PURE__ */ c({
	__name: "CalendarToolbar",
	props: {
		canCreate: {
			type: Boolean,
			default: !0
		},
		search: { default: "" },
		title: {},
		view: {}
	},
	emits: [
		"add",
		"next",
		"prev",
		"search",
		"sidebar-toggle",
		"today",
		"view"
	],
	setup(t) {
		return (n, o) => (h(), i("div", Ce, [a("div", we, [
			a("button", {
				class: "erag-btn erag-btn-icon erag-sidebar-toggle",
				title: "Toggle sidebar",
				onClick: o[0] ||= (e) => n.$emit("sidebar-toggle")
			}, "☰"),
			a("button", {
				class: "erag-btn",
				style: { "font-weight": "600" },
				onClick: o[1] ||= (e) => n.$emit("today")
			}, "Today"),
			a("button", {
				class: "erag-btn erag-btn-icon",
				onClick: o[2] ||= (e) => n.$emit("prev")
			}, "‹"),
			a("button", {
				class: "erag-btn erag-btn-icon",
				onClick: o[3] ||= (e) => n.$emit("next")
			}, "›"),
			a("span", Te, b(t.title), 1)
		]), a("div", Ee, [
			a("div", De, [o[7] ||= a("svg", {
				class: "erag-search-icon",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 16 16",
				"aria-hidden": "true"
			}, [a("path", { d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" })], -1), a("input", {
				type: "search",
				placeholder: "Search...",
				value: t.search,
				onInput: o[4] ||= (e) => n.$emit("search", S(Z)(e))
			}, null, 40, Oe)]),
			a("div", ke, [(h(!0), i(e, null, v(S(P), (e) => (h(), i("button", {
				key: e,
				class: f(["erag-view-tab", { "erag-active": t.view === e }]),
				onClick: (t) => n.$emit("view", e)
			}, b(e[0].toUpperCase() + e.slice(1)), 11, Ae))), 128))]),
			a("select", {
				class: "erag-btn erag-mobile-sel",
				value: t.view,
				onChange: o[5] ||= (e) => n.$emit("view", S(Z)(e))
			}, [(h(!0), i(e, null, v(S(P), (e) => (h(), i("option", {
				key: e,
				value: e
			}, b(e[0].toUpperCase() + e.slice(1)), 9, Me))), 128))], 40, je),
			t.canCreate ? (h(), i("button", {
				key: 0,
				class: "erag-btn erag-btn-primary",
				onClick: o[6] ||= (e) => n.$emit("add")
			}, "+ Add")) : r("", !0)
		])]));
	}
});
//#endregion
//#region src/composables/useDaySchedule.ts
function Pe(e, n) {
	let r = t(() => I(e())), i = t(() => I(/* @__PURE__ */ new Date())), a = t(() => Y(n(), r.value)), { hours: o, nowTop: s } = X();
	return {
		date: r,
		dayEvents: a,
		eventStyle: q,
		hours: o,
		nowTop: s,
		today: i
	};
}
//#endregion
//#region src/components/DayView.vue?vue&type=script&setup=true&lang.ts
var Fe = { class: "erag-day-wrap" }, Ie = { class: "erag-day-hdr" }, Le = { class: "erag-day-scroll" }, Re = { class: "erag-time-col" }, ze = { class: "erag-time-label" }, Be = { class: "erag-dcol" }, Ve = ["onClick"], He = /* @__PURE__ */ c({
	__name: "DayView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { date: o, dayEvents: s, eventStyle: c, hours: l, nowTop: u, today: d } = Pe(() => n.currentDate, () => n.events);
		return (n, f) => (h(), i("div", Fe, [a("div", Ie, b(S(V)(t.currentDate)), 1), a("div", Le, [a("div", Re, [(h(!0), i(e, null, v(S(l), (e) => (h(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", ze, b(e === 0 ? "" : S(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), a("div", Be, [
			(h(!0), i(e, null, v(S(l), (e) => (h(), i("div", {
				key: e,
				class: "erag-dslot",
				onClick: f[0] ||= (e) => n.$emit("add", S(o))
			}))), 128)),
			(h(!0), i(e, null, v(S(s), (e) => (h(), i("div", {
				key: S(K)(e),
				class: "erag-devent",
				style: m(S(c)(e, 28)),
				onClick: O((t) => n.$emit("detail", e), ["stop"])
			}, b(S(z)(e.start)) + "-" + b(S(z)(e.end)) + " " + b(e.title), 13, Ve))), 128)),
			S(o) === S(d) ? (h(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: m({ top: `${S(u)}px` })
			}, [...f[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		])])]));
	}
}), Ue = (e, t) => e.find((e) => e.id === t.cal)?.label || t.cal, Q = (e, t) => {
	let n = t.mentioned_user_ids || [];
	return e.filter((e) => n.includes(e.user_id)).map((e) => e.name).join(", ");
};
//#endregion
//#region src/composables/useEventForm.ts
function We({ calendars: e, event: t, onSave: n, open: r, selectedDate: i }) {
	let a = _(""), o = g({
		id: null,
		title: "",
		date: "",
		start: "09:00",
		end: "10:00",
		cal: "",
		color: "#378ADD",
		desc: "",
		mentioned_user_ids: []
	}), s = () => {
		let n = t(), r = e()[0] || {
			id: "work",
			color: "#378ADD"
		};
		o.id = n?.id || null, o.title = n?.title || "", o.date = n?.date || i() || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), o.start = B(n?.start || "09:00"), o.end = B(n?.end || "10:00"), o.cal = n?.cal || r.id, o.color = n?.color || r.color || "#378ADD", o.desc = n?.desc || "", o.mentioned_user_ids = [...n?.mentioned_user_ids || []], a.value = "";
	};
	return T(() => [
		e(),
		t(),
		r?.(),
		i()
	], s, { immediate: !0 }), {
		form: o,
		resetForm: s,
		save: () => {
			if (!o.title.trim()) return;
			let e = B(o.start), t = B(o.end);
			if (R(t) < R(e)) {
				a.value = "End time must be after start time.";
				return;
			}
			a.value = "", n({
				...o,
				title: o.title.trim(),
				start: e,
				end: t
			});
		},
		setCustomColor: (e) => {
			/^#[0-9A-Fa-f]{6}$/.test(e) && (o.color = e.toUpperCase());
		},
		timeError: a
	};
}
//#endregion
//#region src/composables/useMentionUsers.ts
function Ge(e, n) {
	let r = _(""), i = _(null), a = _(!1), o = t(() => e.mentioned_user_ids || []), s = t(() => n().filter((e) => o.value.includes(e.user_id)));
	return {
		addMentionUser: (t) => {
			e.mentioned_user_ids?.includes(t.user_id) || (e.mentioned_user_ids = [...e.mentioned_user_ids || [], t.user_id]), r.value = "", a.value = !1;
		},
		availableMentionUsers: t(() => {
			let e = r.value.trim().toLowerCase();
			return n().filter((t) => o.value.includes(t.user_id) ? !1 : !e || t.name.toLowerCase().includes(e));
		}),
		focusMentionSearch: async () => {
			a.value = !0, await d(), i.value?.focus();
		},
		mentionListOpen: a,
		mentionSearch: r,
		mentionSearchInput: i,
		removeMentionUser: (t) => {
			e.mentioned_user_ids = (e.mentioned_user_ids || []).filter((e) => e !== t);
		},
		resetMentionSearch: () => {
			r.value = "", a.value = !1;
		},
		selectedMentionUsers: s
	};
}
//#endregion
//#region src/components/EventModal.vue?vue&type=script&setup=true&lang.ts
var Ke = { class: "erag-modal" }, qe = { class: "erag-modal-hdr" }, Je = { class: "erag-modal-title" }, Ye = { class: "erag-detail-row" }, Xe = { class: "erag-detail-row" }, Ze = {
	key: 0,
	class: "erag-detail-row"
}, Qe = { class: "erag-detail-row" }, $e = {
	key: 1,
	class: "erag-detail-row"
}, et = { class: "erag-modal-footer" }, tt = ["disabled"], nt = ["disabled"], rt = { class: "erag-modal-hdr" }, it = { class: "erag-modal-title" }, at = { class: "erag-form-group" }, ot = { class: "erag-form-group" }, st = { class: "erag-form-group erag-form-row" }, ct = {
	key: 0,
	class: "erag-form-error"
}, lt = { class: "erag-form-group" }, ut = ["value"], dt = {
	key: 1,
	class: "erag-form-group"
}, ft = ["onMousedown"], pt = {
	key: 0,
	class: "erag-mention-menu"
}, mt = {
	key: 0,
	class: "erag-mention-results"
}, ht = ["onMousedown"], gt = {
	key: 1,
	class: "erag-mention-empty"
}, _t = { class: "erag-form-group" }, vt = { class: "erag-color-row" }, yt = ["onClick"], bt = { class: "erag-custom-color-row" }, xt = ["value"], St = { class: "erag-form-group" }, Ct = { class: "erag-modal-footer" }, wt = ["disabled"], Tt = ["disabled"], Et = /* @__PURE__ */ c({
	__name: "EventModal",
	props: {
		calendars: {},
		event: { default: null },
		mentionUsers: { default: () => [] },
		mentionUsersAllowed: {
			type: Boolean,
			default: !0
		},
		mode: { default: "create" },
		open: {
			type: Boolean,
			default: !1
		},
		permissions: { default: () => ({
			create: !0,
			update: !0,
			delete: !0
		}) },
		processing: {
			type: Boolean,
			default: !1
		},
		selectedDate: { default: "" }
	},
	emits: [
		"close",
		"delete",
		"edit",
		"save"
	],
	setup(t, { emit: n }) {
		let s = t, c = n, { form: u, save: d, setCustomColor: p, timeError: g } = We({
			calendars: () => s.calendars,
			event: () => s.event,
			onSave: (e) => c("save", e),
			open: () => s.open,
			selectedDate: () => s.selectedDate
		}), { addMentionUser: _, availableMentionUsers: y, focusMentionSearch: x, mentionListOpen: k, mentionSearch: A, mentionSearchInput: j, removeMentionUser: M, resetMentionSearch: P, selectedMentionUsers: F } = Ge(u, () => s.mentionUsers);
		return T(() => [
			s.open,
			s.event,
			s.selectedDate
		], P, { immediate: !0 }), (n, s) => t.open ? (h(), i("div", {
			key: 0,
			class: "erag-overlay",
			onClick: s[23] ||= O((e) => n.$emit("close"), ["self"])
		}, [a("div", Ke, [t.mode === "detail" && t.event ? (h(), i(e, { key: 0 }, [
			a("div", {
				class: "erag-detail-bar",
				style: m({ background: t.event.color })
			}, null, 4),
			a("div", qe, [a("span", Je, b(t.event.title), 1), a("button", {
				class: "erag-modal-close",
				onClick: s[0] ||= (e) => n.$emit("close")
			}, "×")]),
			a("div", Ye, [s[24] ||= a("span", { class: "erag-detail-icon" }, "📅", -1), a("span", null, b(S(V)(S(L)(t.event.date))), 1)]),
			a("div", Xe, [s[25] ||= a("span", { class: "erag-detail-icon" }, "🕐", -1), a("span", null, b(S(z)(t.event.start)) + " - " + b(S(z)(t.event.end)), 1)]),
			t.event.desc ? (h(), i("div", Ze, [s[26] ||= a("span", { class: "erag-detail-icon" }, "📝", -1), a("span", null, b(t.event.desc), 1)])) : r("", !0),
			a("div", Qe, [s[27] ||= a("span", { class: "erag-detail-icon" }, "🏷", -1), a("span", null, b(S(Ue)(t.calendars, t.event)), 1)]),
			S(Q)(t.mentionUsers, t.event) ? (h(), i("div", $e, [s[28] ||= a("span", { class: "erag-detail-icon" }, "@", -1), a("span", null, b(S(Q)(t.mentionUsers, t.event)), 1)])) : r("", !0),
			a("div", et, [
				t.permissions.delete ? (h(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: t.processing,
					onClick: s[1] ||= (e) => n.$emit("delete", t.event)
				}, "Delete", 8, tt)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: s[2] ||= (e) => n.$emit("close")
				}, "Close"),
				t.permissions.update ? (h(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: t.processing,
					onClick: s[3] ||= (e) => n.$emit("edit", t.event)
				}, "Edit", 8, nt)) : r("", !0)
			])
		], 64)) : (h(), i(e, { key: 1 }, [
			a("div", rt, [a("span", it, b(S(u).id ? "Edit event" : "New event"), 1), a("button", {
				class: "erag-modal-close",
				onClick: s[4] ||= (e) => n.$emit("close")
			}, "×")]),
			a("div", at, [s[29] ||= a("label", { class: "erag-form-label" }, "Title", -1), E(a("input", {
				"onUpdate:modelValue": s[5] ||= (e) => S(u).title = e,
				class: "erag-form-input",
				placeholder: "Event title"
			}, null, 512), [[w, S(u).title]])]),
			a("div", ot, [s[30] ||= a("label", { class: "erag-form-label" }, "Date", -1), E(a("input", {
				"onUpdate:modelValue": s[6] ||= (e) => S(u).date = e,
				class: "erag-form-input",
				type: "date"
			}, null, 512), [[w, S(u).date]])]),
			a("div", st, [a("div", null, [s[31] ||= a("label", { class: "erag-form-label" }, "Start", -1), E(a("input", {
				"onUpdate:modelValue": s[7] ||= (e) => S(u).start = e,
				class: "erag-form-input",
				type: "time",
				onBlur: s[8] ||= (e) => S(u).start = S(B)(S(u).start)
			}, null, 544), [[w, S(u).start]])]), a("div", null, [s[32] ||= a("label", { class: "erag-form-label" }, "End", -1), E(a("input", {
				"onUpdate:modelValue": s[9] ||= (e) => S(u).end = e,
				class: "erag-form-input",
				type: "time",
				onBlur: s[10] ||= (e) => S(u).end = S(B)(S(u).end)
			}, null, 544), [[w, S(u).end]])])]),
			S(g) ? (h(), i("div", ct, b(S(g)), 1)) : r("", !0),
			a("div", lt, [s[33] ||= a("label", { class: "erag-form-label" }, "Calendar", -1), E(a("select", {
				"onUpdate:modelValue": s[11] ||= (e) => S(u).cal = e,
				class: "erag-form-input"
			}, [(h(!0), i(e, null, v(t.calendars, (e) => (h(), i("option", {
				key: e.id,
				value: e.id
			}, b(e.label), 9, ut))), 128))], 512), [[C, S(u).cal]])]),
			t.mentionUsersAllowed && t.mentionUsers.length ? (h(), i("div", dt, [s[34] ||= a("label", { class: "erag-form-label" }, "Mention users", -1), a("div", {
				class: "erag-mention-select",
				onFocusout: s[16] ||= (e) => k.value = !1
			}, [a("div", {
				class: "erag-mention-control",
				onClick: s[15] ||= (...e) => S(x) && S(x)(...e)
			}, [(h(!0), i(e, null, v(S(F), (e) => (h(), i("span", {
				key: e.user_id,
				class: "erag-mention-chip"
			}, [o(b(e.name) + " ", 1), a("button", {
				type: "button",
				class: "erag-mention-remove",
				onMousedown: O((t) => S(M)(e.user_id), ["stop", "prevent"])
			}, "×", 40, ft)]))), 128)), E(a("input", {
				ref_key: "mentionSearchInput",
				ref: j,
				"onUpdate:modelValue": s[12] ||= (e) => l(A) ? A.value = e : null,
				class: "erag-mention-input",
				placeholder: "Search users...",
				onFocus: s[13] ||= (e) => k.value = !0,
				onKeydown: s[14] ||= D((e) => k.value = !1, ["esc"])
			}, null, 544), [[w, S(A)]])]), S(k) ? (h(), i("div", pt, [S(y).length ? (h(), i("div", mt, [(h(!0), i(e, null, v(S(y), (e) => (h(), i("button", {
				key: e.user_id,
				type: "button",
				class: "erag-mention-item",
				onMousedown: O((t) => S(_)(e), ["prevent"])
			}, b(e.name), 41, ht))), 128))])) : r("", !0), S(y).length ? r("", !0) : (h(), i("div", gt, "No users found"))])) : r("", !0)], 32)])) : r("", !0),
			a("div", _t, [
				s[35] ||= a("label", { class: "erag-form-label" }, "Color", -1),
				a("div", vt, [(h(!0), i(e, null, v(S(N), (e) => (h(), i("div", {
					key: e,
					class: f(["erag-cswatch", { "erag-sel": S(u).color === e }]),
					style: m({ background: e }),
					onClick: (t) => S(u).color = e
				}, null, 14, yt))), 128))]),
				a("div", bt, [
					a("span", {
						class: "erag-custom-color-preview",
						style: m({ background: S(u).color })
					}, null, 4),
					E(a("input", {
						"onUpdate:modelValue": s[17] ||= (e) => S(u).color = e,
						class: "erag-custom-color-picker",
						type: "color",
						"aria-label": "Pick custom color"
					}, null, 512), [[w, S(u).color]]),
					a("input", {
						value: S(u).color,
						class: "erag-custom-color-input",
						maxlength: "7",
						placeholder: "#378ADD",
						onInput: s[18] ||= (e) => S(p)(e.target.value)
					}, null, 40, xt)
				])
			]),
			a("div", St, [s[36] ||= a("label", { class: "erag-form-label" }, "Notes", -1), E(a("textarea", {
				"onUpdate:modelValue": s[19] ||= (e) => S(u).desc = e,
				rows: "3",
				class: "erag-form-input",
				placeholder: "Add notes..."
			}, null, 512), [[w, S(u).desc]])]),
			a("div", Ct, [
				S(u).id && t.permissions.delete ? (h(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: t.processing,
					onClick: s[20] ||= (e) => n.$emit("delete", { ...S(u) })
				}, "Delete", 8, wt)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: s[21] ||= (e) => n.$emit("close")
				}, "Cancel"),
				(S(u).id ? t.permissions.update : t.permissions.create) ? (h(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: t.processing,
					onClick: s[22] ||= (...e) => S(d) && S(d)(...e)
				}, b(S(u).id ? "Update" : "Add event"), 9, Tt)) : r("", !0)
			])
		], 64))])])) : r("", !0);
	}
});
//#endregion
//#region src/composables/useMonthGrid.ts
function Dt(e, n) {
	return { cells: t(() => {
		let t = e().getFullYear(), r = e().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r, 1 - i), o = I(/* @__PURE__ */ new Date());
		return Array.from({ length: 42 }, (e, t) => {
			let i = new Date(a);
			i.setDate(i.getDate() + t);
			let s = I(i);
			return {
				date: i,
				events: Y(n(), s),
				other: i.getMonth() !== r,
				today: s === o,
				value: s
			};
		});
	}) };
}
//#endregion
//#region src/components/MonthView.vue?vue&type=script&setup=true&lang.ts
var Ot = { style: {
	display: "flex",
	"flex-direction": "column",
	flex: "1",
	height: "100%",
	"min-height": "0"
} }, kt = { class: "erag-month-dow-row" }, At = {
	class: "erag-month-grid",
	style: {
		flex: "1",
		overflow: "hidden"
	}
}, jt = ["onClick"], Mt = { class: "erag-day-num" }, Nt = ["onClick"], Pt = {
	key: 0,
	class: "erag-more"
}, Ft = /* @__PURE__ */ c({
	__name: "MonthView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { cells: o } = Dt(() => n.currentDate, () => n.events);
		return (t, n) => (h(), i("div", Ot, [a("div", kt, [(h(!0), i(e, null, v(S(j), (e) => (h(), i("div", {
			key: e,
			class: "erag-dow"
		}, b(e), 1))), 128))]), a("div", At, [(h(!0), i(e, null, v(S(o), (n) => (h(), i("div", {
			key: n.value,
			class: f(["erag-cell", {
				"erag-other-month": n.other,
				"erag-today": n.today
			}]),
			onClick: (e) => t.$emit("add", n.value)
		}, [
			a("div", Mt, b(n.date.getDate()), 1),
			(h(!0), i(e, null, v(n.events.slice(0, 3), (e) => (h(), i("div", {
				key: S(K)(e),
				class: "erag-pill",
				style: m({
					background: `${e.color}22`,
					color: e.color
				}),
				onClick: O((n) => t.$emit("detail", e), ["stop"])
			}, b(e.start === "00:00" ? "" : `${S(z)(e.start)} `) + b(e.title), 13, Nt))), 128)),
			n.events.length > 3 ? (h(), i("div", Pt, "+" + b(n.events.length - 3) + " more", 1)) : r("", !0)
		], 10, jt))), 128))])]));
	}
});
//#endregion
//#region src/composables/useWeekGrid.ts
function It(e, n) {
	let r = t(() => I(/* @__PURE__ */ new Date())), { hours: i, nowTop: a } = X();
	return {
		eventsFor: (e) => Y(n(), e),
		eventStyle: q,
		hours: i,
		nowTop: a,
		today: r,
		weekDays: t(() => {
			let t = new Date(e());
			return t.setDate(t.getDate() - t.getDay()), Array.from({ length: 7 }, (e, n) => {
				let r = new Date(t);
				return r.setDate(r.getDate() + n), r;
			});
		})
	};
}
//#endregion
//#region src/components/WeekView.vue?vue&type=script&setup=true&lang.ts
var Lt = { class: "erag-week-wrap" }, Rt = { class: "erag-week-head" }, zt = { class: "erag-wday-name" }, Bt = { class: "erag-wday-num" }, Vt = { class: "erag-week-scroll" }, Ht = { class: "erag-time-col" }, Ut = { class: "erag-time-label" }, Wt = ["onClick"], Gt = ["onClick"], Kt = /* @__PURE__ */ c({
	__name: "WeekView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { eventsFor: o, eventStyle: s, hours: c, nowTop: l, today: u, weekDays: d } = It(() => n.currentDate, () => n.events);
		return (t, n) => (h(), i("div", Lt, [a("div", Rt, [n[0] ||= a("div", { class: "erag-wgutter" }, null, -1), (h(!0), i(e, null, v(S(d), (e) => (h(), i("div", {
			key: S(I)(e),
			class: f(["erag-wday-head", { "erag-today": S(I)(e) === S(u) }])
		}, [a("div", zt, b(S(j)[e.getDay()]), 1), a("div", Bt, b(e.getDate()), 1)], 2))), 128))]), a("div", Vt, [a("div", Ht, [(h(!0), i(e, null, v(S(c), (e) => (h(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", Ut, b(e === 0 ? "" : S(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), (h(!0), i(e, null, v(S(d), (d) => (h(), i("div", {
			key: S(I)(d),
			class: "erag-wcol"
		}, [
			(h(!0), i(e, null, v(S(c), (e) => (h(), i("div", {
				key: e,
				class: "erag-wslot",
				onClick: (e) => t.$emit("add", S(I)(d))
			}, null, 8, Wt))), 128)),
			(h(!0), i(e, null, v(S(o)(d), (e) => (h(), i("div", {
				key: S(K)(e),
				class: "erag-wevent",
				style: m(S(s)(e)),
				onClick: O((n) => t.$emit("detail", e), ["stop"])
			}, b(S(z)(e.start)) + " " + b(e.title), 13, Gt))), 128)),
			S(I)(d) === S(u) ? (h(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: m({ top: `${S(l)}px` })
			}, [...n[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		]))), 128))])]));
	}
}), qt = {
	key: 1,
	class: "erag-cal-root"
}, Jt = { class: "erag-body" }, Yt = { class: "erag-main" }, $ = /* @__PURE__ */ c({
	__name: "Calendar",
	props: {
		resource: { default: void 0 },
		calendar: { default: void 0 },
		config: { default: () => ({}) },
		permissions: { default: () => ({
			create: !0,
			update: !0,
			delete: !0
		}) },
		routes: { default: () => ({}) },
		visitOptions: { default: () => ({}) },
		headless: {
			type: Boolean,
			default: !1
		},
		mentionUsers: { default: () => [] },
		persistWithInertia: {
			type: Boolean,
			default: !1
		},
		calendars: { default: void 0 },
		events: { default: void 0 },
		initialDate: { default: void 0 },
		initialView: { default: "month" },
		sidebarOpen: { type: Boolean }
	},
	emits: [
		"create",
		"delete",
		"update"
	],
	setup(e, { emit: o }) {
		let c = e, l = o, { calendarOptions: d, config: f, mentionUsers: m, permissions: g, routes: _, shouldPersist: v } = re(c), b = ee(x(() => d.value)), C = ae(_.value, c.visitOptions), { closeModal: w, modalMode: T, modalOpen: E, openCreate: D, openDetail: O, openEdit: k, selectedDate: A, selectedEvent: j } = te(b.currentDate, () => g.value.create, () => g.value.update), { deleteEvent: M, saveEvent: N } = ne({
			calendar: b,
			canDelete: () => g.value.delete,
			closeModal: w,
			emit: {
				create: (e) => l("create", e),
				delete: (e) => l("delete", e),
				update: (e) => l("update", e)
			},
			inertiaEvents: C,
			shouldPersist: v
		}), P = t(() => ({
			...b,
			errors: C.errors,
			processing: C.processing,
			closeModal: w,
			deleteEvent: M,
			modalMode: T,
			modalOpen: E,
			openCreate: D,
			openDetail: O,
			openEdit: k,
			saveEvent: N,
			selectedDate: A,
			selectedEvent: j
		}));
		return (t, o) => e.headless ? y(t.$slots, "default", p(u({ key: 0 }, P.value))) : (h(), i("div", qt, [
			s(Ne, {
				search: S(b).search.value,
				"can-create": S(g).create,
				title: S(b).title.value,
				view: S(b).currentView.value,
				onAdd: o[0] ||= (e) => S(D)(),
				onNext: o[1] ||= (e) => S(b).navigate(1),
				onPrev: o[2] ||= (e) => S(b).navigate(-1),
				onSearch: o[3] ||= (e) => S(b).search.value = e,
				onSidebarToggle: o[4] ||= (e) => S(b).sidebarOpen.value = !S(b).sidebarOpen.value,
				onToday: o[5] ||= (e) => S(b).goToday(),
				onView: o[6] ||= (e) => S(b).setView(e)
			}, null, 8, [
				"search",
				"can-create",
				"title",
				"view"
			]),
			a("div", Jt, [S(f).sidebar === !1 ? r("", !0) : (h(), n(Se, {
				key: 0,
				calendars: S(b).calendars.value,
				"current-date": S(b).currentDate.value,
				"mini-date": S(b).miniDate.value,
				open: S(b).sidebarOpen.value,
				"visible-calendars": S(b).visibleCalendars.value,
				onAdd: o[7] ||= (e) => S(D)(),
				onMiniNext: o[8] ||= (e) => S(b).miniDate.value = new Date(S(b).miniDate.value.getFullYear(), S(b).miniDate.value.getMonth() + 1, 1),
				onMiniPrev: o[9] ||= (e) => S(b).miniDate.value = new Date(S(b).miniDate.value.getFullYear(), S(b).miniDate.value.getMonth() - 1, 1),
				onSelectDate: o[10] ||= (e) => S(b).selectDate(e),
				onToggleCalendar: o[11] ||= (e) => S(b).toggleCalendar(e)
			}, null, 8, [
				"calendars",
				"current-date",
				"mini-date",
				"open",
				"visible-calendars"
			])), a("main", Yt, [S(b).currentView.value === "month" ? (h(), n(Ft, {
				key: 0,
				"current-date": S(b).currentDate.value,
				events: S(b).filteredEvents.value,
				onAdd: S(D),
				onDetail: S(O)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : S(b).currentView.value === "week" ? (h(), n(Kt, {
				key: 1,
				"current-date": S(b).currentDate.value,
				events: S(b).filteredEvents.value,
				onAdd: S(D),
				onDetail: S(O)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : S(b).currentView.value === "day" ? (h(), n(He, {
				key: 2,
				"current-date": S(b).currentDate.value,
				events: S(b).filteredEvents.value,
				onAdd: S(D),
				onDetail: S(O)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : (h(), n(pe, {
				key: 3,
				"current-date": S(b).currentDate.value,
				events: S(b).filteredEvents.value,
				onDetail: S(O)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			]))])]),
			s(Et, {
				calendars: S(b).calendars.value,
				event: S(j),
				"mention-users": S(m),
				"mention-users-allowed": S(f).mention_users !== !1,
				mode: S(T),
				open: S(E),
				permissions: S(g),
				processing: S(C).processing.value,
				"selected-date": S(A),
				onClose: S(w),
				onDelete: S(M),
				onEdit: S(k),
				onSave: S(N)
			}, null, 8, [
				"calendars",
				"event",
				"mention-users",
				"mention-users-allowed",
				"mode",
				"open",
				"permissions",
				"processing",
				"selected-date",
				"onClose",
				"onDelete",
				"onEdit",
				"onSave"
			])
		]));
	}
}), Xt = { install(e) {
	e.component("InertiaCalendar", $);
} };
//#endregion
export { pe as AgendaView, $ as Calendar, $ as InertiaCalendar, Se as CalendarSidebar, Ne as CalendarToolbar, He as DayView, Et as EventModal, Ft as MonthView, Kt as WeekView, Ue as calendarLabel, I as dateToString, j as days, Xt as default, K as eventKey, q as eventTimeStyle, Y as eventsForDate, V as formatLongDate, H as formatMonthYear, z as formatTime, U as formatWeekRange, Z as inputValue, Q as mentionedUsersLabel, A as months, B as normalizeTime, L as parseDate, M as shortDays, J as sortEventsByTime, N as swatchColors, R as timeToMinutes, oe as useAgendaGroups, ee as useCalendar, te as useCalendarModal, ne as useCalendarMutations, re as useCalendarResource, Pe as useDaySchedule, We as useEventForm, ae as useInertiaCalendarEvents, Ge as useMentionUsers, he as useMiniCalendar, Dt as useMonthGrid, X as useTimeSlots, It as useWeekGrid, P as views };

//# sourceMappingURL=inertia-calendar.js.map