import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createStaticVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, isRef as u, mergeProps as d, nextTick as f, normalizeClass as p, normalizeProps as m, normalizeStyle as h, onUnmounted as ee, openBlock as g, reactive as _, ref as v, renderList as y, renderSlot as b, toDisplayString as x, toRef as S, unref as C, vModelSelect as w, vModelText as T, watch as E, withDirectives as D, withKeys as O, withModifiers as k } from "vue";
import { useHttp as A } from "@inertiajs/vue3";
//#region src/constants.ts
var j = [
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
], M = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], N = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
], te = [
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
}, V = (e) => `${M[e.getDay()]}, ${j[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`, H = (e) => `${j[e.getMonth()]} ${e.getFullYear()}`, U = (e) => {
	let t = new Date(e);
	t.setDate(t.getDate() - t.getDay());
	let n = new Date(t);
	return n.setDate(n.getDate() + 6), t.getMonth() === n.getMonth() ? `${j[t.getMonth()]} ${t.getDate()}-${n.getDate()}, ${t.getFullYear()}` : `${j[t.getMonth()]} ${t.getDate()} - ${j[n.getMonth()]} ${n.getDate()}`;
};
function ne(e = {}) {
	let n = t(() => "value" in e ? e.value : e), r = /* @__PURE__ */ new Date(), i = v(n.value.initialDate ? L(n.value.initialDate) : new Date(r.getFullYear(), r.getMonth(), r.getDate())), a = v(new Date(i.value.getFullYear(), i.value.getMonth(), 1)), o = v(n.value.initialView || "month"), s = v(n.value.sidebarOpen ?? !0), c = v(""), l = v([...n.value.calendars || []]), u = v([...n.value.events || []]), d = v(new Set(l.value.map((e) => e.id)));
	E(() => n.value.events, (e) => {
		Array.isArray(e) && (u.value = [...e]);
	}), E(() => n.value.calendars, (e) => {
		Array.isArray(e) && e.length && (l.value = [...e], d.value = new Set(e.map((e) => e.id)));
	}), E(() => n.value.sidebarOpen, (e) => {
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
function re(e, t, n) {
	let r = v(!1), i = v("create"), a = v(""), o = v(null);
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
function ie({ calendar: e, canDelete: t, closeModal: n, emit: r, inertiaEvents: i, shouldPersist: a }) {
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
function ae(e) {
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
var oe = {
	create: null,
	store: null,
	update: null,
	delete: null,
	destroy: null
}, W = (e, t) => typeof e == "function" ? e(t) : e && t?.id ? e.replace(":id", String(t.id)) : e || null;
function se(e = {}, n = {}) {
	let r = {
		...oe,
		...e
	}, i = A({}), a = t(() => i.errors), o = t(() => i.processing), s = (e, t, r = {}, a = {}) => t ? (i.transform(() => r), i[e](t, {
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
function ce(e, n) {
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
var le = {
	key: 0,
	class: "erag-agenda-wrap"
}, ue = ["onClick"], de = { class: "erag-atime" }, fe = { class: "erag-atitle" }, pe = {
	key: 0,
	class: "erag-adesc"
}, me = {
	key: 1,
	class: "erag-empty"
}, he = /* @__PURE__ */ l({
	__name: "AgendaView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["detail"],
	setup(t) {
		let n = t, { groupedEvents: o } = ce(() => n.currentDate, () => n.events);
		return (t, n) => C(o).length ? (g(), i("div", le, [(g(!0), i(e, null, y(C(o), (n) => (g(), i("div", {
			key: n.date,
			class: "erag-agenda-group"
		}, [a("div", { class: p(["erag-agenda-date", { "erag-today-hdr": n.isToday }]) }, x(C(V)(C(L)(n.date))), 3), (g(!0), i(e, null, y(n.events, (e) => (g(), i("div", {
			key: C(K)(e),
			class: "erag-agenda-ev",
			onClick: (n) => t.$emit("detail", e)
		}, [
			a("div", {
				class: "erag-acolor",
				style: h({ background: e.color })
			}, null, 4),
			a("div", de, x(C(z)(e.start)) + " - " + x(C(z)(e.end)), 1),
			a("div", null, [a("div", fe, x(e.title), 1), e.desc ? (g(), i("div", pe, x(e.desc), 1)) : r("", !0)])
		], 8, ue))), 128))]))), 128))])) : (g(), i("div", me, "No events"));
	}
}), ge = (e) => String(e).padStart(2, "0");
function _e(e, n) {
	let r = t(() => `${j[n().getMonth()].slice(0, 3)} ${n().getFullYear()}`);
	return {
		miniDays: t(() => {
			let t = n().getFullYear(), r = n().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r + 1, 0).getDate(), o = I(/* @__PURE__ */ new Date()), s = I(e()), c = [];
			for (let e = 0; e < i; e += 1) c.push({
				label: new Date(t, r, -(i - e - 1)).getDate(),
				other: !0
			});
			for (let e = 1; e <= a; e += 1) {
				let n = `${t}-${ge(r + 1)}-${ge(e)}`;
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
var ve = { class: "erag-mini-header" }, ye = { class: "erag-mini-title" }, be = { class: "erag-mini-nav-group" }, xe = { class: "erag-mini-grid" }, Se = ["onClick"], Ce = ["onClick"], we = /* @__PURE__ */ l({
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
		let n = t, { miniDays: r, miniTitle: o, parseMiniDate: c } = _e(() => n.currentDate, () => n.miniDate);
		return (n, l) => (g(), i("div", { class: p(["erag-sidebar", { "erag-collapsed": !t.open }]) }, [
			a("div", null, [a("div", ve, [a("span", ye, x(C(o)), 1), a("div", be, [a("button", {
				class: "erag-mini-nav",
				title: "Previous month",
				onClick: l[0] ||= (e) => n.$emit("mini-prev")
			}, [...l[3] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m15 18-6-6 6-6" })], -1)]]), a("button", {
				class: "erag-mini-nav",
				title: "Next month",
				onClick: l[1] ||= (e) => n.$emit("mini-next")
			}, [...l[4] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m9 18 6-6-6-6" })], -1)]])])]), a("div", xe, [(g(!0), i(e, null, y(C(N), (e) => (g(), i("div", {
				key: e,
				class: "erag-mini-dow"
			}, x(e), 1))), 128)), (g(!0), i(e, null, y(C(r), (e, t) => (g(), i("div", {
				key: `${e.date || "other"}-${t}`,
				class: p(["erag-mini-day", {
					"erag-other": e.other,
					"erag-today": e.today,
					"erag-selected": e.selected
				}]),
				onClick: (t) => e.date && n.$emit("select-date", C(c)(e.date))
			}, x(e.label), 11, Se))), 128))])]),
			a("div", null, [l[5] ||= a("div", { class: "erag-legend-label" }, "Calendars", -1), a("div", null, [(g(!0), i(e, null, y(t.calendars, (e) => (g(), i("div", {
				key: e.id,
				class: "erag-legend-item",
				onClick: (t) => n.$emit("toggle-calendar", e.id)
			}, [a("div", {
				class: "erag-legend-dot",
				style: h({
					background: t.visibleCalendars.has(e.id) ? e.color : "#cbd5e1",
					borderColor: t.visibleCalendars.has(e.id) ? "transparent" : "rgba(0,0,0,0.1)"
				})
			}, null, 4), a("span", { class: p({ "erag-active": t.visibleCalendars.has(e.id) }) }, x(e.label), 3)], 8, Ce))), 128))])]),
			a("div", null, [a("button", {
				class: "erag-btn erag-btn-primary erag-btn-block",
				onClick: l[2] ||= (e) => n.$emit("add")
			}, [...l[6] ||= [a("svg", {
				class: "erag-btn-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M5 12h14" }), a("path", { d: "M12 5v14" })], -1), s(" New event ", -1)]])])
		], 2));
	}
}), Z = (e) => e.target.value, Te = { class: "erag-toolbar" }, Ee = { class: "erag-toolbar-left" }, De = { class: "erag-cal-title" }, Oe = { class: "erag-toolbar-right" }, ke = { class: "erag-search-bar" }, Ae = ["value"], je = { class: "erag-view-tabs" }, Me = ["onClick"], Ne = ["value"], Pe = ["value"], Fe = /* @__PURE__ */ l({
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
		return (n, o) => (g(), i("div", Te, [a("div", Ee, [
			a("button", {
				class: "erag-btn erag-btn-icon erag-sidebar-toggle",
				title: "Toggle sidebar",
				onClick: o[0] ||= (e) => n.$emit("sidebar-toggle")
			}, [...o[7] ||= [a("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("rect", {
				width: "18",
				height: "18",
				x: "3",
				y: "3",
				rx: "2"
			}), a("path", { d: "M9 3v18" })], -1)]]),
			a("button", {
				class: "erag-btn erag-btn-today",
				onClick: o[1] ||= (e) => n.$emit("today")
			}, "Today"),
			a("button", {
				class: "erag-btn erag-btn-icon",
				title: "Previous",
				onClick: o[2] ||= (e) => n.$emit("prev")
			}, [...o[8] ||= [a("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "m15 18-6-6 6-6" })], -1)]]),
			a("button", {
				class: "erag-btn erag-btn-icon",
				title: "Next",
				onClick: o[3] ||= (e) => n.$emit("next")
			}, [...o[9] ||= [a("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "m9 18 6-6-6-6" })], -1)]]),
			a("span", De, x(t.title), 1)
		]), a("div", Oe, [
			a("div", ke, [o[10] ||= a("svg", {
				class: "erag-search-icon",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24"
			}, [a("circle", {
				cx: "11",
				cy: "11",
				r: "8"
			}), a("path", { d: "m21 21-4.3-4.3" })], -1), a("input", {
				type: "search",
				placeholder: "Search events...",
				value: t.search,
				onInput: o[4] ||= (e) => n.$emit("search", C(Z)(e))
			}, null, 40, Ae)]),
			a("div", je, [(g(!0), i(e, null, y(C(P), (e) => (g(), i("button", {
				key: e,
				class: p(["erag-view-tab", { "erag-active": t.view === e }]),
				onClick: (t) => n.$emit("view", e)
			}, x(e[0].toUpperCase() + e.slice(1)), 11, Me))), 128))]),
			a("select", {
				class: "erag-btn erag-mobile-sel",
				value: t.view,
				onChange: o[5] ||= (e) => n.$emit("view", C(Z)(e))
			}, [(g(!0), i(e, null, y(C(P), (e) => (g(), i("option", {
				key: e,
				value: e
			}, x(e[0].toUpperCase() + e.slice(1)), 9, Pe))), 128))], 40, Ne),
			t.canCreate ? (g(), i("button", {
				key: 0,
				class: "erag-btn erag-btn-primary",
				onClick: o[6] ||= (e) => n.$emit("add")
			}, [...o[11] ||= [a("svg", {
				class: "erag-btn-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M5 12h14" }), a("path", { d: "M12 5v14" })], -1), s(" Add ", -1)]])) : r("", !0)
		])]));
	}
});
//#endregion
//#region src/composables/useDaySchedule.ts
function Ie(e, n) {
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
var Le = { class: "erag-day-wrap" }, Re = { class: "erag-day-hdr" }, ze = { class: "erag-day-scroll" }, Be = { class: "erag-time-col" }, Ve = { class: "erag-time-label" }, He = { class: "erag-dcol" }, Ue = ["onClick"], We = /* @__PURE__ */ l({
	__name: "DayView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { date: o, dayEvents: s, eventStyle: c, hours: l, nowTop: u, today: d } = Ie(() => n.currentDate, () => n.events);
		return (n, f) => (g(), i("div", Le, [a("div", Re, x(C(V)(t.currentDate)), 1), a("div", ze, [a("div", Be, [(g(!0), i(e, null, y(C(l), (e) => (g(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", Ve, x(e === 0 ? "" : C(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), a("div", He, [
			(g(!0), i(e, null, y(C(l), (e) => (g(), i("div", {
				key: e,
				class: "erag-dslot",
				onClick: f[0] ||= (e) => n.$emit("add", C(o))
			}))), 128)),
			(g(!0), i(e, null, y(C(s), (e) => (g(), i("div", {
				key: C(K)(e),
				class: "erag-devent",
				style: h(C(c)(e, 28)),
				onClick: k((t) => n.$emit("detail", e), ["stop"])
			}, x(C(z)(e.start)) + "-" + x(C(z)(e.end)) + " " + x(e.title), 13, Ue))), 128)),
			C(o) === C(d) ? (g(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: h({ top: `${C(u)}px` })
			}, [...f[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		])])]));
	}
}), Ge = (e, t) => e.find((e) => e.id === t.cal)?.label || t.cal, Q = (e, t) => {
	let n = t.mentioned_user_ids || [];
	return e.filter((e) => n.includes(e.user_id)).map((e) => e.name).join(", ");
};
//#endregion
//#region src/composables/useEventForm.ts
function Ke({ calendars: e, event: t, onSave: n, open: r, selectedDate: i }) {
	let a = v(""), o = _({
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
	return E(() => [
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
function qe(e, n) {
	let r = v(""), i = v(null), a = v(!1), o = t(() => e.mentioned_user_ids || []), s = t(() => n().filter((e) => o.value.includes(e.user_id)));
	return {
		addMentionUser: (t) => {
			e.mentioned_user_ids?.includes(t.user_id) || (e.mentioned_user_ids = [...e.mentioned_user_ids || [], t.user_id]), r.value = "", a.value = !1;
		},
		availableMentionUsers: t(() => {
			let e = r.value.trim().toLowerCase();
			return n().filter((t) => o.value.includes(t.user_id) ? !1 : !e || t.name.toLowerCase().includes(e));
		}),
		focusMentionSearch: async () => {
			a.value = !0, await f(), i.value?.focus();
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
var Je = { class: "erag-modal" }, Ye = { class: "erag-modal-hdr" }, Xe = { class: "erag-modal-title" }, Ze = { class: "erag-detail-row" }, Qe = { class: "erag-detail-row" }, $e = {
	key: 0,
	class: "erag-detail-row"
}, et = { class: "erag-detail-row" }, tt = {
	key: 1,
	class: "erag-detail-row"
}, nt = { class: "erag-modal-footer" }, rt = ["disabled"], it = ["disabled"], at = { class: "erag-modal-hdr" }, ot = { class: "erag-modal-title" }, st = { class: "erag-form-group" }, ct = { class: "erag-form-group erag-form-row" }, lt = ["value"], ut = { class: "erag-form-group erag-form-row" }, dt = {
	key: 0,
	class: "erag-form-error"
}, ft = {
	key: 1,
	class: "erag-form-group"
}, pt = ["onMousedown"], mt = {
	key: 0,
	class: "erag-mention-menu"
}, ht = {
	key: 0,
	class: "erag-mention-results"
}, gt = ["onMousedown"], _t = {
	key: 1,
	class: "erag-mention-empty"
}, vt = { class: "erag-form-group" }, yt = { class: "erag-color-row" }, bt = ["onClick"], xt = { class: "erag-custom-color-row" }, St = ["value"], Ct = { class: "erag-form-group" }, wt = { class: "erag-modal-footer" }, Tt = ["disabled"], Et = ["disabled"], Dt = /* @__PURE__ */ l({
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
		let c = t, l = n, { form: d, save: f, setCustomColor: m, timeError: _ } = Ke({
			calendars: () => c.calendars,
			event: () => c.event,
			onSave: (e) => l("save", e),
			open: () => c.open,
			selectedDate: () => c.selectedDate
		}), { addMentionUser: v, availableMentionUsers: b, focusMentionSearch: S, mentionListOpen: A, mentionSearch: j, mentionSearchInput: M, removeMentionUser: N, resetMentionSearch: P, selectedMentionUsers: F } = qe(d, () => c.mentionUsers);
		return E(() => [
			c.open,
			c.event,
			c.selectedDate
		], P, { immediate: !0 }), E(() => c.open, (e) => {
			e ? document.body.classList.add("erag-no-scroll") : document.body.classList.remove("erag-no-scroll");
		}, { immediate: !0 }), ee(() => {
			document.body.classList.remove("erag-no-scroll");
		}), (n, c) => t.open ? (g(), i("div", {
			key: 0,
			class: "erag-overlay",
			onClick: c[23] ||= k((e) => n.$emit("close"), ["self"])
		}, [a("div", Je, [t.mode === "detail" && t.event ? (g(), i(e, { key: 0 }, [
			a("div", {
				class: "erag-detail-bar",
				style: h({ background: t.event.color })
			}, null, 4),
			a("div", Ye, [a("span", Xe, x(t.event.title), 1), a("button", {
				class: "erag-modal-close",
				title: "Close",
				onClick: c[0] ||= (e) => n.$emit("close")
			}, [...c[24] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			a("div", Ze, [c[25] ||= o("<span class=\"erag-detail-icon\" title=\"Date\"><svg viewBox=\"0 0 24 24\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg></span>", 1), a("span", null, x(C(V)(C(L)(t.event.date))), 1)]),
			a("div", Qe, [c[26] ||= a("span", {
				class: "erag-detail-icon",
				title: "Time"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}), a("polyline", { points: "12 6 12 12 16 14" })])], -1), a("span", null, x(C(z)(t.event.start)) + " - " + x(C(z)(t.event.end)), 1)]),
			t.event.desc ? (g(), i("div", $e, [c[27] ||= o("<span class=\"erag-detail-icon\" title=\"Notes\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></span>", 1), a("span", null, x(t.event.desc), 1)])) : r("", !0),
			a("div", et, [c[28] ||= a("span", {
				class: "erag-detail-icon",
				title: "Calendar"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z" }), a("path", { d: "m7 7-.01.01" })])], -1), a("span", null, x(C(Ge)(t.calendars, t.event)), 1)]),
			C(Q)(t.mentionUsers, t.event) ? (g(), i("div", tt, [c[29] ||= o("<span class=\"erag-detail-icon\" title=\"Mentioned users\"><svg viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path></svg></span>", 1), a("span", null, x(C(Q)(t.mentionUsers, t.event)), 1)])) : r("", !0),
			a("div", nt, [
				t.permissions.delete ? (g(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: t.processing,
					onClick: c[1] ||= (e) => n.$emit("delete", t.event)
				}, "Delete", 8, rt)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: c[2] ||= (e) => n.$emit("close")
				}, "Close"),
				t.permissions.update ? (g(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: t.processing,
					onClick: c[3] ||= (e) => n.$emit("edit", t.event)
				}, "Edit", 8, it)) : r("", !0)
			])
		], 64)) : (g(), i(e, { key: 1 }, [
			a("div", at, [a("span", ot, x(C(d).id ? "Edit event" : "New event"), 1), a("button", {
				class: "erag-modal-close",
				title: "Cancel",
				onClick: c[4] ||= (e) => n.$emit("close")
			}, [...c[30] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			a("div", st, [c[31] ||= a("label", { class: "erag-form-label" }, "Title", -1), D(a("input", {
				"onUpdate:modelValue": c[5] ||= (e) => C(d).title = e,
				class: "erag-form-input",
				placeholder: "Event title"
			}, null, 512), [[T, C(d).title]])]),
			a("div", ct, [a("div", null, [c[32] ||= a("label", { class: "erag-form-label" }, "Date", -1), D(a("input", {
				"onUpdate:modelValue": c[6] ||= (e) => C(d).date = e,
				class: "erag-form-input",
				type: "date"
			}, null, 512), [[T, C(d).date]])]), a("div", null, [c[33] ||= a("label", { class: "erag-form-label" }, "Calendar", -1), D(a("select", {
				"onUpdate:modelValue": c[7] ||= (e) => C(d).cal = e,
				class: "erag-form-input"
			}, [(g(!0), i(e, null, y(t.calendars, (e) => (g(), i("option", {
				key: e.id,
				value: e.id
			}, x(e.label), 9, lt))), 128))], 512), [[w, C(d).cal]])])]),
			a("div", ut, [a("div", null, [c[34] ||= a("label", { class: "erag-form-label" }, "Start", -1), D(a("input", {
				"onUpdate:modelValue": c[8] ||= (e) => C(d).start = e,
				class: "erag-form-input",
				type: "time",
				onBlur: c[9] ||= (e) => C(d).start = C(B)(C(d).start)
			}, null, 544), [[T, C(d).start]])]), a("div", null, [c[35] ||= a("label", { class: "erag-form-label" }, "End", -1), D(a("input", {
				"onUpdate:modelValue": c[10] ||= (e) => C(d).end = e,
				class: "erag-form-input",
				type: "time",
				onBlur: c[11] ||= (e) => C(d).end = C(B)(C(d).end)
			}, null, 544), [[T, C(d).end]])])]),
			C(_) ? (g(), i("div", dt, x(C(_)), 1)) : r("", !0),
			t.mentionUsersAllowed && t.mentionUsers.length ? (g(), i("div", ft, [c[37] ||= a("label", { class: "erag-form-label" }, "Mention users", -1), a("div", {
				class: "erag-mention-select",
				onFocusout: c[16] ||= (e) => A.value = !1
			}, [a("div", {
				class: "erag-mention-control",
				onClick: c[15] ||= (...e) => C(S) && C(S)(...e)
			}, [(g(!0), i(e, null, y(C(F), (e) => (g(), i("span", {
				key: e.user_id,
				class: "erag-mention-chip"
			}, [s(x(e.name) + " ", 1), a("button", {
				type: "button",
				class: "erag-mention-remove",
				title: "Remove",
				onMousedown: k((t) => C(N)(e.user_id), ["stop", "prevent"])
			}, [...c[36] ||= [a("svg", {
				class: "erag-mention-remove-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]], 40, pt)]))), 128)), D(a("input", {
				ref_key: "mentionSearchInput",
				ref: M,
				"onUpdate:modelValue": c[12] ||= (e) => u(j) ? j.value = e : null,
				class: "erag-mention-input",
				placeholder: "Search users...",
				onFocus: c[13] ||= (e) => A.value = !0,
				onKeydown: c[14] ||= O((e) => A.value = !1, ["esc"])
			}, null, 544), [[T, C(j)]])]), C(A) ? (g(), i("div", mt, [C(b).length ? (g(), i("div", ht, [(g(!0), i(e, null, y(C(b), (e) => (g(), i("button", {
				key: e.user_id,
				type: "button",
				class: "erag-mention-item",
				onMousedown: k((t) => C(v)(e), ["prevent"])
			}, x(e.name), 41, gt))), 128))])) : r("", !0), C(b).length ? r("", !0) : (g(), i("div", _t, "No users found"))])) : r("", !0)], 32)])) : r("", !0),
			a("div", vt, [
				c[38] ||= a("label", { class: "erag-form-label" }, "Color", -1),
				a("div", yt, [(g(!0), i(e, null, y(C(te), (e) => (g(), i("div", {
					key: e,
					class: p(["erag-cswatch", { "erag-sel": C(d).color === e }]),
					style: h({ background: e }),
					onClick: (t) => C(d).color = e
				}, null, 14, bt))), 128))]),
				a("div", xt, [
					a("span", {
						class: "erag-custom-color-preview",
						style: h({ background: C(d).color })
					}, null, 4),
					D(a("input", {
						"onUpdate:modelValue": c[17] ||= (e) => C(d).color = e,
						class: "erag-custom-color-picker",
						type: "color",
						"aria-label": "Pick custom color"
					}, null, 512), [[T, C(d).color]]),
					a("input", {
						value: C(d).color,
						class: "erag-custom-color-input",
						maxlength: "7",
						placeholder: "#378ADD",
						onInput: c[18] ||= (e) => C(m)(e.target.value)
					}, null, 40, St)
				])
			]),
			a("div", Ct, [c[39] ||= a("label", { class: "erag-form-label" }, "Notes", -1), D(a("textarea", {
				"onUpdate:modelValue": c[19] ||= (e) => C(d).desc = e,
				rows: "3",
				class: "erag-form-input",
				placeholder: "Add notes..."
			}, null, 512), [[T, C(d).desc]])]),
			a("div", wt, [
				C(d).id && t.permissions.delete ? (g(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: t.processing,
					onClick: c[20] ||= (e) => n.$emit("delete", { ...C(d) })
				}, "Delete", 8, Tt)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: c[21] ||= (e) => n.$emit("close")
				}, "Cancel"),
				(C(d).id ? t.permissions.update : t.permissions.create) ? (g(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: t.processing,
					onClick: c[22] ||= (...e) => C(f) && C(f)(...e)
				}, x(C(d).id ? "Update" : "Add event"), 9, Et)) : r("", !0)
			])
		], 64))])])) : r("", !0);
	}
});
//#endregion
//#region src/composables/useMonthGrid.ts
function Ot(e, n) {
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
var kt = { class: "erag-month-wrap" }, At = { class: "erag-month-dow-row" }, jt = { class: "erag-month-grid" }, Mt = ["onClick"], Nt = { class: "erag-day-num" }, Pt = ["onClick"], Ft = {
	key: 0,
	class: "erag-more"
}, It = /* @__PURE__ */ l({
	__name: "MonthView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { cells: o } = Ot(() => n.currentDate, () => n.events);
		return (t, n) => (g(), i("div", kt, [a("div", At, [(g(!0), i(e, null, y(C(M), (e) => (g(), i("div", {
			key: e,
			class: "erag-dow"
		}, x(e), 1))), 128))]), a("div", jt, [(g(!0), i(e, null, y(C(o), (n) => (g(), i("div", {
			key: n.value,
			class: p(["erag-cell", {
				"erag-other-month": n.other,
				"erag-today": n.today
			}]),
			onClick: (e) => t.$emit("add", n.value)
		}, [
			a("div", Nt, x(n.date.getDate()), 1),
			(g(!0), i(e, null, y(n.events.slice(0, 3), (e) => (g(), i("div", {
				key: C(K)(e),
				class: "erag-pill",
				style: h({
					background: `${e.color}22`,
					color: e.color
				}),
				onClick: k((n) => t.$emit("detail", e), ["stop"])
			}, x(e.start === "00:00" ? "" : `${C(z)(e.start)} `) + x(e.title), 13, Pt))), 128)),
			n.events.length > 3 ? (g(), i("div", Ft, "+" + x(n.events.length - 3) + " more", 1)) : r("", !0)
		], 10, Mt))), 128))])]));
	}
});
//#endregion
//#region src/composables/useWeekGrid.ts
function Lt(e, n) {
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
var Rt = { class: "erag-week-wrap" }, zt = { class: "erag-week-head" }, Bt = { class: "erag-wday-name" }, Vt = { class: "erag-wday-num" }, Ht = { class: "erag-week-scroll" }, Ut = { class: "erag-time-col" }, Wt = { class: "erag-time-label" }, Gt = ["onClick"], Kt = ["onClick"], qt = /* @__PURE__ */ l({
	__name: "WeekView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { eventsFor: o, eventStyle: s, hours: c, nowTop: l, today: u, weekDays: d } = Lt(() => n.currentDate, () => n.events);
		return (t, n) => (g(), i("div", Rt, [a("div", zt, [n[0] ||= a("div", { class: "erag-wgutter" }, null, -1), (g(!0), i(e, null, y(C(d), (e) => (g(), i("div", {
			key: C(I)(e),
			class: p(["erag-wday-head", { "erag-today": C(I)(e) === C(u) }])
		}, [a("div", Bt, x(C(M)[e.getDay()]), 1), a("div", Vt, x(e.getDate()), 1)], 2))), 128))]), a("div", Ht, [a("div", Ut, [(g(!0), i(e, null, y(C(c), (e) => (g(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", Wt, x(e === 0 ? "" : C(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), (g(!0), i(e, null, y(C(d), (d) => (g(), i("div", {
			key: C(I)(d),
			class: "erag-wcol"
		}, [
			(g(!0), i(e, null, y(C(c), (e) => (g(), i("div", {
				key: e,
				class: "erag-wslot",
				onClick: (e) => t.$emit("add", C(I)(d))
			}, null, 8, Gt))), 128)),
			(g(!0), i(e, null, y(C(o)(d), (e) => (g(), i("div", {
				key: C(K)(e),
				class: "erag-wevent",
				style: h(C(s)(e)),
				onClick: k((n) => t.$emit("detail", e), ["stop"])
			}, x(C(z)(e.start)) + " " + x(e.title), 13, Kt))), 128)),
			C(I)(d) === C(u) ? (g(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: h({ top: `${C(l)}px` })
			}, [...n[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		]))), 128))])]));
	}
}), Jt = {
	key: 1,
	class: "erag-cal-root"
}, Yt = { class: "erag-body" }, Xt = { class: "erag-main" }, $ = /* @__PURE__ */ l({
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
		let s = e, l = o, { calendarOptions: u, config: f, mentionUsers: p, permissions: h, routes: ee, shouldPersist: _ } = ae(s), v = ne(S(() => u.value)), y = se(ee.value, s.visitOptions), { closeModal: x, modalMode: w, modalOpen: T, openCreate: E, openDetail: D, openEdit: O, selectedDate: k, selectedEvent: A } = re(v.currentDate, () => h.value.create, () => h.value.update), { deleteEvent: j, saveEvent: M } = ie({
			calendar: v,
			canDelete: () => h.value.delete,
			closeModal: x,
			emit: {
				create: (e) => l("create", e),
				delete: (e) => l("delete", e),
				update: (e) => l("update", e)
			},
			inertiaEvents: y,
			shouldPersist: _
		}), N = t(() => ({
			...v,
			errors: y.errors,
			processing: y.processing,
			closeModal: x,
			deleteEvent: j,
			modalMode: w,
			modalOpen: T,
			openCreate: E,
			openDetail: D,
			openEdit: O,
			saveEvent: M,
			selectedDate: k,
			selectedEvent: A
		}));
		return (t, o) => e.headless ? b(t.$slots, "default", m(d({ key: 0 }, N.value))) : (g(), i("div", Jt, [
			c(Fe, {
				search: C(v).search.value,
				"can-create": C(h).create,
				title: C(v).title.value,
				view: C(v).currentView.value,
				onAdd: o[0] ||= (e) => C(E)(),
				onNext: o[1] ||= (e) => C(v).navigate(1),
				onPrev: o[2] ||= (e) => C(v).navigate(-1),
				onSearch: o[3] ||= (e) => C(v).search.value = e,
				onSidebarToggle: o[4] ||= (e) => C(v).sidebarOpen.value = !C(v).sidebarOpen.value,
				onToday: o[5] ||= (e) => C(v).goToday(),
				onView: o[6] ||= (e) => C(v).setView(e)
			}, null, 8, [
				"search",
				"can-create",
				"title",
				"view"
			]),
			a("div", Yt, [C(f).sidebar === !1 ? r("", !0) : (g(), n(we, {
				key: 0,
				calendars: C(v).calendars.value,
				"current-date": C(v).currentDate.value,
				"mini-date": C(v).miniDate.value,
				open: C(v).sidebarOpen.value,
				"visible-calendars": C(v).visibleCalendars.value,
				onAdd: o[7] ||= (e) => C(E)(),
				onMiniNext: o[8] ||= (e) => C(v).miniDate.value = new Date(C(v).miniDate.value.getFullYear(), C(v).miniDate.value.getMonth() + 1, 1),
				onMiniPrev: o[9] ||= (e) => C(v).miniDate.value = new Date(C(v).miniDate.value.getFullYear(), C(v).miniDate.value.getMonth() - 1, 1),
				onSelectDate: o[10] ||= (e) => C(v).selectDate(e),
				onToggleCalendar: o[11] ||= (e) => C(v).toggleCalendar(e)
			}, null, 8, [
				"calendars",
				"current-date",
				"mini-date",
				"open",
				"visible-calendars"
			])), a("main", Xt, [C(v).currentView.value === "month" ? (g(), n(It, {
				key: 0,
				"current-date": C(v).currentDate.value,
				events: C(v).filteredEvents.value,
				onAdd: C(E),
				onDetail: C(D)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : C(v).currentView.value === "week" ? (g(), n(qt, {
				key: 1,
				"current-date": C(v).currentDate.value,
				events: C(v).filteredEvents.value,
				onAdd: C(E),
				onDetail: C(D)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : C(v).currentView.value === "day" ? (g(), n(We, {
				key: 2,
				"current-date": C(v).currentDate.value,
				events: C(v).filteredEvents.value,
				onAdd: C(E),
				onDetail: C(D)
			}, null, 8, [
				"current-date",
				"events",
				"onAdd",
				"onDetail"
			])) : (g(), n(he, {
				key: 3,
				"current-date": C(v).currentDate.value,
				events: C(v).filteredEvents.value,
				onDetail: C(D)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			]))])]),
			c(Dt, {
				calendars: C(v).calendars.value,
				event: C(A),
				"mention-users": C(p),
				"mention-users-allowed": C(f).mention_users !== !1,
				mode: C(w),
				open: C(T),
				permissions: C(h),
				processing: C(y).processing.value,
				"selected-date": C(k),
				onClose: C(x),
				onDelete: C(j),
				onEdit: C(O),
				onSave: C(M)
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
}), Zt = { install(e) {
	e.component("InertiaCalendar", $);
} };
//#endregion
export { he as AgendaView, $ as Calendar, $ as InertiaCalendar, we as CalendarSidebar, Fe as CalendarToolbar, We as DayView, Dt as EventModal, It as MonthView, qt as WeekView, Ge as calendarLabel, I as dateToString, M as days, Zt as default, K as eventKey, q as eventTimeStyle, Y as eventsForDate, V as formatLongDate, H as formatMonthYear, z as formatTime, U as formatWeekRange, Z as inputValue, Q as mentionedUsersLabel, j as months, B as normalizeTime, L as parseDate, N as shortDays, J as sortEventsByTime, te as swatchColors, R as timeToMinutes, ce as useAgendaGroups, ne as useCalendar, re as useCalendarModal, ie as useCalendarMutations, ae as useCalendarResource, Ie as useDaySchedule, Ke as useEventForm, se as useInertiaCalendarEvents, qe as useMentionUsers, _e as useMiniCalendar, Ot as useMonthGrid, X as useTimeSlots, Lt as useWeekGrid, P as views };

//# sourceMappingURL=inertia-calendar.js.map