import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createStaticVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, isRef as u, mergeProps as d, nextTick as f, normalizeClass as p, normalizeProps as m, normalizeStyle as h, onUnmounted as ee, openBlock as g, reactive as _, ref as v, renderList as y, renderSlot as te, toDisplayString as b, toRef as x, unref as S, vModelSelect as C, vModelText as w, watch as T, withDirectives as E, withKeys as D, withModifiers as O } from "vue";
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
function W(e = {}) {
	let n = t(() => "value" in e ? e.value : e), r = /* @__PURE__ */ new Date(), i = v(n.value.initialDate ? L(n.value.initialDate) : new Date(r.getFullYear(), r.getMonth(), r.getDate())), a = v(new Date(i.value.getFullYear(), i.value.getMonth(), 1)), o = v(n.value.initialView || "month"), s = v(n.value.sidebarOpen ?? !0), c = v(""), l = v([...n.value.calendars || []]), u = v([...n.value.events || []]), d = v(new Set(l.value.map((e) => e.id)));
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
function G(e, t, n) {
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
function K({ calendar: e, canDelete: t, closeModal: n, emit: r, inertiaEvents: i, shouldPersist: a }) {
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
function q(e) {
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
var ne = {
	create: null,
	store: null,
	update: null,
	delete: null,
	destroy: null
}, J = (e, t) => typeof e == "function" ? e(t) : e && t?.id ? e.replace(":id", String(t.id)) : e || null;
function re(e = {}, n = {}) {
	let r = {
		...ne,
		...e
	}, i = k({}), a = t(() => i.errors), o = t(() => i.processing), s = (e, t, r = {}, a = {}) => t ? (i.transform(() => r), i[e](t, {
		...n,
		...a
	}).catch(() => null)) : Promise.resolve(null);
	return {
		errors: a,
		processing: o,
		createEvent: (e, t = {}) => s("post", J(r.create || r.store, e), e, t),
		updateEvent: (e, t = {}) => s("put", J(r.update, e), e, t),
		deleteEvent: (e, t = {}) => s("delete", J(r.delete || r.destroy, e), {}, t)
	};
}
//#endregion
//#region src/composables/useEventLayout.ts
var Y = 48, X = (e) => e.id ?? `${e.date}-${e.start}-${e.title}`, Z = (e, t = 20) => ({
	top: `${R(e.start) * Y / 60}px`,
	height: `${Math.max((R(e.end) - R(e.start)) * Y / 60, t)}px`,
	background: `${e.color}22`,
	color: e.color,
	borderLeft: `3px solid ${e.color}`
}), Q = (e) => [...e].sort((e, t) => R(e.start) - R(t.start)), $ = (e, t) => {
	let n = typeof t == "string" ? t : I(t);
	return Q(e.filter((e) => e.date === n));
};
function ie() {
	return {
		hours: t(() => Array.from({ length: 24 }, (e, t) => t)),
		nowTop: t(() => {
			let e = /* @__PURE__ */ new Date();
			return (e.getHours() * 60 + e.getMinutes()) * Y / 60;
		})
	};
}
//#endregion
//#region src/composables/useAgendaGroups.ts
function ae(e, n) {
	return { groupedEvents: t(() => {
		let t = new Date(e()), r = new Date(t);
		r.setDate(r.getDate() + 14);
		let i = /* @__PURE__ */ new Map();
		return n().filter((e) => {
			let n = L(e.date);
			return n >= t && n <= r;
		}).sort((e, t) => `${e.date} ${e.start}`.localeCompare(`${t.date} ${t.start}`)).forEach((e) => {
			let t = i.get(e.date) || [];
			i.set(e.date, Q([...t, e]));
		}), Array.from(i.entries()).map(([e, t]) => ({
			date: e,
			events: t,
			isToday: e === I(/* @__PURE__ */ new Date())
		}));
	}) };
}
//#endregion
//#region src/components/AgendaView.vue?vue&type=script&setup=true&lang.ts
var oe = {
	key: 0,
	class: "erag-agenda-wrap"
}, se = ["onClick"], ce = { class: "erag-atime" }, le = { class: "erag-atitle" }, ue = {
	key: 0,
	class: "erag-adesc"
}, de = {
	key: 1,
	class: "erag-empty"
}, fe = /* @__PURE__ */ l({
	__name: "AgendaView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["detail"],
	setup(t) {
		let n = t, { groupedEvents: o } = ae(() => n.currentDate, () => n.events);
		return (t, n) => S(o).length ? (g(), i("div", oe, [(g(!0), i(e, null, y(S(o), (n) => (g(), i("div", {
			key: n.date,
			class: "erag-agenda-group"
		}, [a("div", { class: p(["erag-agenda-date", { "erag-today-hdr": n.isToday }]) }, b(S(V)(S(L)(n.date))), 3), (g(!0), i(e, null, y(n.events, (e) => (g(), i("div", {
			key: S(X)(e),
			class: "erag-agenda-ev",
			onClick: (n) => t.$emit("detail", e)
		}, [
			a("div", {
				class: "erag-acolor",
				style: h({ background: e.color })
			}, null, 4),
			a("div", ce, b(S(z)(e.start)) + " - " + b(S(z)(e.end)), 1),
			a("div", null, [a("div", le, b(e.title), 1), e.desc ? (g(), i("div", ue, b(e.desc), 1)) : r("", !0)])
		], 8, se))), 128))]))), 128))])) : (g(), i("div", de, "No events"));
	}
}), pe = (e) => String(e).padStart(2, "0");
function me(e, n) {
	let r = t(() => `${A[n().getMonth()].slice(0, 3)} ${n().getFullYear()}`);
	return {
		miniDays: t(() => {
			let t = n().getFullYear(), r = n().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r + 1, 0).getDate(), o = I(/* @__PURE__ */ new Date()), s = I(e()), c = [];
			for (let e = 0; e < i; e += 1) c.push({
				label: new Date(t, r, -(i - e - 1)).getDate(),
				other: !0
			});
			for (let e = 1; e <= a; e += 1) {
				let n = `${t}-${pe(r + 1)}-${pe(e)}`;
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
var he = { class: "erag-mini-header" }, ge = { class: "erag-mini-title" }, _e = { class: "erag-mini-nav-group" }, ve = { class: "erag-mini-grid" }, ye = ["onClick"], be = ["onClick"], xe = { class: "erag-sidebar-actions" }, Se = /* @__PURE__ */ l({
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
		"add-task",
		"mini-next",
		"mini-prev",
		"select-date",
		"toggle-calendar"
	],
	setup(t) {
		let n = t, { miniDays: r, miniTitle: o, parseMiniDate: c } = me(() => n.currentDate, () => n.miniDate);
		return (n, l) => (g(), i("div", { class: p(["erag-sidebar", { "erag-collapsed": !t.open }]) }, [
			a("div", null, [a("div", he, [a("span", ge, b(S(o)), 1), a("div", _e, [a("button", {
				class: "erag-mini-nav",
				title: "Previous month",
				onClick: l[0] ||= (e) => n.$emit("mini-prev")
			}, [...l[4] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m15 18-6-6 6-6" })], -1)]]), a("button", {
				class: "erag-mini-nav",
				title: "Next month",
				onClick: l[1] ||= (e) => n.$emit("mini-next")
			}, [...l[5] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m9 18 6-6-6-6" })], -1)]])])]), a("div", ve, [(g(!0), i(e, null, y(S(M), (e) => (g(), i("div", {
				key: e,
				class: "erag-mini-dow"
			}, b(e), 1))), 128)), (g(!0), i(e, null, y(S(r), (e, t) => (g(), i("div", {
				key: `${e.date || "other"}-${t}`,
				class: p(["erag-mini-day", {
					"erag-other": e.other,
					"erag-today": e.today,
					"erag-selected": e.selected
				}]),
				onClick: (t) => e.date && n.$emit("select-date", S(c)(e.date))
			}, b(e.label), 11, ye))), 128))])]),
			a("div", null, [l[6] ||= a("div", { class: "erag-legend-label" }, "Calendars", -1), a("div", null, [(g(!0), i(e, null, y(t.calendars, (e) => (g(), i("div", {
				key: e.id,
				class: "erag-legend-item",
				onClick: (t) => n.$emit("toggle-calendar", e.id)
			}, [a("div", {
				class: "erag-legend-dot",
				style: h({
					background: t.visibleCalendars.has(e.id) ? e.color : "#cbd5e1",
					borderColor: t.visibleCalendars.has(e.id) ? "transparent" : "rgba(0,0,0,0.1)"
				})
			}, null, 4), a("span", { class: p({ "erag-active": t.visibleCalendars.has(e.id) }) }, b(e.label), 3)], 8, be))), 128))])]),
			a("div", xe, [a("button", {
				class: "erag-btn erag-btn-primary erag-btn-block",
				onClick: l[2] ||= (e) => n.$emit("add")
			}, [...l[7] ||= [a("svg", {
				class: "erag-btn-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M5 12h14" }), a("path", { d: "M12 5v14" })], -1), s(" New event ", -1)]]), a("button", {
				class: "erag-btn erag-btn-task erag-btn-block",
				onClick: l[3] ||= (e) => n.$emit("add-task")
			}, [...l[8] ||= [a("svg", {
				class: "erag-btn-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M12 5v14M5 12h14" })], -1), s(" New task ", -1)]])])
		], 2));
	}
}), Ce = (e) => e.target.value, we = { class: "erag-toolbar" }, Te = { class: "erag-toolbar-left" }, Ee = { class: "erag-cal-title" }, De = { class: "erag-toolbar-right" }, Oe = { class: "erag-search-bar" }, ke = ["value"], Ae = { style: {
	display: "flex",
	"align-items": "center",
	gap: "8px"
} }, je = { class: "erag-view-tabs" }, Me = ["onClick"], Ne = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2.2",
	"stroke-linecap": "round",
	"stroke-linejoin": "round",
	style: {
		width: "18px",
		height: "18px"
	}
}, Pe = ["value"], Fe = ["value"], Ie = /* @__PURE__ */ l({
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
		return (n, o) => (g(), i("div", we, [a("div", Te, [
			a("button", {
				class: "erag-btn erag-btn-icon erag-sidebar-toggle",
				title: "Toggle sidebar",
				onClick: o[0] ||= (e) => n.$emit("sidebar-toggle")
			}, [...o[8] ||= [a("svg", {
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
			}, [...o[9] ||= [a("svg", {
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
			}, [...o[10] ||= [a("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "m9 18 6-6-6-6" })], -1)]]),
			a("span", Ee, b(t.title), 1)
		]), a("div", De, [
			a("div", Oe, [o[11] ||= a("svg", {
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
				onInput: o[4] ||= (e) => n.$emit("search", S(Ce)(e))
			}, null, 40, ke)]),
			a("div", Ae, [a("div", je, [(g(!0), i(e, null, y(S(P), (e) => (g(), i("button", {
				key: e,
				class: p(["erag-view-tab", { "erag-active": t.view === e }]),
				onClick: (t) => n.$emit("view", e)
			}, b(e[0].toUpperCase() + e.slice(1)), 11, Me))), 128))]), a("button", {
				class: p(["erag-btn erag-btn-icon erag-settings-toggle-btn", { "erag-active": t.view === "settings" }]),
				title: "Settings",
				onClick: o[5] ||= (e) => n.$emit("view", "settings")
			}, [(g(), i("svg", Ne, [...o[12] ||= [a("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }, null, -1), a("circle", {
				cx: "12",
				cy: "12",
				r: "3"
			}, null, -1)]]))], 2)]),
			a("select", {
				class: "erag-btn erag-mobile-sel",
				value: t.view,
				onChange: o[6] ||= (e) => n.$emit("view", S(Ce)(e))
			}, [(g(!0), i(e, null, y(S(P), (e) => (g(), i("option", {
				key: e,
				value: e
			}, b(e[0].toUpperCase() + e.slice(1)), 9, Fe))), 128)), o[13] ||= a("option", { value: "settings" }, "Settings", -1)], 40, Pe),
			t.canCreate ? (g(), i("button", {
				key: 0,
				class: "erag-btn erag-btn-primary",
				onClick: o[7] ||= (e) => n.$emit("add")
			}, [...o[14] ||= [a("svg", {
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
function Le(e, n) {
	let r = t(() => I(e())), i = t(() => I(/* @__PURE__ */ new Date())), a = t(() => $(n(), r.value)), { hours: o, nowTop: s } = ie();
	return {
		date: r,
		dayEvents: a,
		eventStyle: Z,
		hours: o,
		nowTop: s,
		today: i
	};
}
//#endregion
//#region src/components/DayView.vue?vue&type=script&setup=true&lang.ts
var Re = { class: "erag-day-wrap" }, ze = { class: "erag-day-hdr" }, Be = { class: "erag-day-scroll" }, Ve = { class: "erag-time-col" }, He = { class: "erag-time-label" }, Ue = { class: "erag-dcol" }, We = ["onClick"], Ge = /* @__PURE__ */ l({
	__name: "DayView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { date: o, dayEvents: s, eventStyle: c, hours: l, nowTop: u, today: d } = Le(() => n.currentDate, () => n.events);
		return (n, f) => (g(), i("div", Re, [a("div", ze, b(S(V)(t.currentDate)), 1), a("div", Be, [a("div", Ve, [(g(!0), i(e, null, y(S(l), (e) => (g(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", He, b(e === 0 ? "" : S(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), a("div", Ue, [
			(g(!0), i(e, null, y(S(l), (e) => (g(), i("div", {
				key: e,
				class: "erag-dslot",
				onClick: f[0] ||= (e) => n.$emit("add", S(o))
			}))), 128)),
			(g(!0), i(e, null, y(S(s), (e) => (g(), i("div", {
				key: S(X)(e),
				class: "erag-devent",
				style: h(S(c)(e, 28)),
				onClick: O((t) => n.$emit("detail", e), ["stop"])
			}, b(S(z)(e.start)) + "-" + b(S(z)(e.end)) + " " + b(e.title), 13, We))), 128)),
			S(o) === S(d) ? (g(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: h({ top: `${S(u)}px` })
			}, [...f[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		])])]));
	}
}), Ke = (e, t) => e.find((e) => e.id === t.cal)?.label || t.cal, qe = (e, t) => {
	let n = t.mentioned_user_ids || [];
	return e.filter((e) => n.includes(e.user_id)).map((e) => e.name).join(", ");
};
//#endregion
//#region src/composables/useEventForm.ts
function Je({ calendars: e, event: t, onSave: n, open: r, selectedDate: i }) {
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
function Ye(e, n) {
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
var Xe = { class: "erag-modal" }, Ze = { class: "erag-modal-hdr" }, Qe = { class: "erag-modal-title" }, $e = { class: "erag-detail-row" }, et = { class: "erag-detail-row" }, tt = {
	key: 0,
	class: "erag-detail-row"
}, nt = { class: "erag-detail-row" }, rt = {
	key: 1,
	class: "erag-detail-row"
}, it = { class: "erag-modal-footer" }, at = ["disabled"], ot = ["disabled"], st = {
	class: "erag-modal-hdr",
	style: { "margin-bottom": "8px" }
}, ct = { class: "erag-modal-title" }, lt = {
	key: 0,
	class: "erag-tab-row"
}, ut = {
	class: "erag-form-group",
	style: {
		"padding-left": "40px",
		"margin-bottom": "20px"
	}
}, dt = { class: "erag-field-row" }, ft = { class: "erag-field-content" }, pt = {
	class: "erag-form-group erag-form-row",
	style: { "margin-bottom": "0" }
}, mt = { class: "erag-form-row" }, ht = {
	key: 0,
	class: "erag-form-error",
	style: { "margin-top": "8px" }
}, gt = { class: "erag-field-row" }, _t = { class: "erag-field-content" }, vt = ["value"], yt = {
	key: 0,
	class: "erag-field-row"
}, bt = { class: "erag-field-content" }, xt = ["onMousedown"], St = {
	key: 0,
	class: "erag-mention-menu"
}, Ct = {
	key: 0,
	class: "erag-mention-results"
}, wt = ["onMousedown"], Tt = {
	key: 1,
	class: "erag-mention-empty"
}, Et = { class: "erag-field-row" }, Dt = { class: "erag-field-content" }, Ot = { class: "erag-color-row" }, kt = ["onClick"], At = { class: "erag-custom-color-row" }, jt = ["value"], Mt = { class: "erag-field-row" }, Nt = { class: "erag-field-content" }, Pt = { class: "erag-modal-footer" }, Ft = ["disabled"], It = ["disabled"], Lt = {
	class: "erag-form-group",
	style: {
		"padding-left": "40px",
		"margin-bottom": "20px"
	}
}, Rt = { class: "erag-field-row" }, zt = { class: "erag-field-content" }, Bt = { style: {
	display: "flex",
	"align-items": "center",
	gap: "12px",
	"flex-wrap": "wrap"
} }, Vt = { class: "erag-field-row" }, Ht = {
	class: "erag-field-content",
	style: {
		display: "flex",
		"align-items": "center",
		height: "36px"
	}
}, Ut = { class: "erag-field-row" }, Wt = { class: "erag-field-content" }, Gt = { class: "erag-field-row" }, Kt = { class: "erag-field-content" }, qt = { class: "erag-modal-footer" }, Jt = ["disabled"], Yt = /* @__PURE__ */ l({
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
		selectedDate: { default: "" },
		initialTab: { default: "event" }
	},
	emits: [
		"close",
		"delete",
		"edit",
		"save",
		"save-task"
	],
	setup(t, { emit: n }) {
		let c = t, l = n, { form: d, save: f, setCustomColor: m, timeError: _ } = Je({
			calendars: () => c.calendars,
			event: () => c.event,
			onSave: (e) => l("save", e),
			open: () => c.open,
			selectedDate: () => c.selectedDate
		}), { addMentionUser: te, availableMentionUsers: x, focusMentionSearch: k, mentionListOpen: A, mentionSearch: j, mentionSearchInput: M, removeMentionUser: P, resetMentionSearch: F, selectedMentionUsers: I } = Ye(d, () => c.mentionUsers);
		T(() => [
			c.open,
			c.event,
			c.selectedDate
		], F, { immediate: !0 });
		let R = v("event"), H = v(""), U = v(""), W = v(""), G = v(!1), K = v(""), q = v("My Tasks");
		T(() => c.open, (e) => {
			e ? (document.body.classList.add("erag-no-scroll"), R.value = c.initialTab || "event", H.value = "", U.value = c.selectedDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0], W.value = "12:00", G.value = !1, K.value = "", q.value = "My Tasks") : document.body.classList.remove("erag-no-scroll");
		}, { immediate: !0 }), ee(() => {
			document.body.classList.remove("erag-no-scroll");
		});
		let ne = () => {
			H.value.trim() && (l("save-task", {
				title: H.value,
				date: U.value,
				time: G.value ? W.value : "",
				allDay: !G.value,
				desc: K.value,
				list: q.value
			}), l("close"));
		};
		return (n, c) => t.open ? (g(), i("div", {
			key: 0,
			class: "erag-overlay",
			onClick: c[33] ||= O((e) => n.$emit("close"), ["self"])
		}, [a("div", Xe, [t.mode === "detail" && t.event ? (g(), i(e, { key: 0 }, [
			a("div", {
				class: "erag-detail-bar",
				style: h({ background: t.event.color })
			}, null, 4),
			a("div", Ze, [a("span", Qe, b(t.event.title), 1), a("button", {
				class: "erag-modal-close",
				title: "Close",
				onClick: c[0] ||= (e) => n.$emit("close")
			}, [...c[34] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			a("div", $e, [c[35] ||= o("<span class=\"erag-detail-icon\" title=\"Date\"><svg viewBox=\"0 0 24 24\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg></span>", 1), a("span", null, b(S(V)(S(L)(t.event.date))), 1)]),
			a("div", et, [c[36] ||= a("span", {
				class: "erag-detail-icon",
				title: "Time"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}), a("polyline", { points: "12 6 12 12 16 14" })])], -1), a("span", null, b(S(z)(t.event.start)) + " - " + b(S(z)(t.event.end)), 1)]),
			t.event.desc ? (g(), i("div", tt, [c[37] ||= o("<span class=\"erag-detail-icon\" title=\"Notes\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></span>", 1), a("span", null, b(t.event.desc), 1)])) : r("", !0),
			a("div", nt, [c[38] ||= a("span", {
				class: "erag-detail-icon",
				title: "Calendar"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z" }), a("path", { d: "m7 7-.01.01" })])], -1), a("span", null, b(S(Ke)(t.calendars, t.event)), 1)]),
			S(qe)(t.mentionUsers, t.event) ? (g(), i("div", rt, [c[39] ||= o("<span class=\"erag-detail-icon\" title=\"Mentioned users\"><svg viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path></svg></span>", 1), a("span", null, b(S(qe)(t.mentionUsers, t.event)), 1)])) : r("", !0),
			a("div", it, [
				t.permissions.delete ? (g(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: t.processing,
					onClick: c[1] ||= (e) => n.$emit("delete", t.event)
				}, "Delete", 8, at)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: c[2] ||= (e) => n.$emit("close")
				}, "Close"),
				t.permissions.update ? (g(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: t.processing,
					onClick: c[3] ||= (e) => n.$emit("edit", t.event)
				}, "Edit", 8, ot)) : r("", !0)
			])
		], 64)) : (g(), i(e, { key: 1 }, [
			a("div", st, [a("span", ct, b(S(d).id ? R.value === "event" ? "Edit event" : "Edit task" : R.value === "event" ? "New event" : "New task"), 1), a("button", {
				class: "erag-modal-close",
				title: "Cancel",
				onClick: c[4] ||= (e) => n.$emit("close")
			}, [...c[40] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			!S(d).id && t.mode === "create" ? (g(), i("div", lt, [a("button", {
				type: "button",
				class: p(["erag-tab-pill", { "erag-active": R.value === "event" }]),
				onClick: c[5] ||= (e) => R.value = "event"
			}, " Event ", 2), a("button", {
				type: "button",
				class: p(["erag-tab-pill", { "erag-active": R.value === "task" }]),
				onClick: c[6] ||= (e) => R.value = "task"
			}, " Task ", 2)])) : r("", !0),
			R.value === "event" ? (g(), i(e, { key: 1 }, [
				a("div", ut, [E(a("input", {
					"onUpdate:modelValue": c[7] ||= (e) => S(d).title = e,
					class: "erag-title-input",
					placeholder: "Add title",
					autofocus: ""
				}, null, 512), [[w, S(d).title]])]),
				a("div", dt, [c[44] ||= a("div", {
					class: "erag-field-icon",
					title: "Date and Time"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}), a("polyline", { points: "12 6 12 12 16 14" })])], -1), a("div", ft, [a("div", pt, [a("div", null, [c[41] ||= a("label", { class: "erag-form-label" }, "Date", -1), E(a("input", {
					"onUpdate:modelValue": c[8] ||= (e) => S(d).date = e,
					class: "erag-form-input",
					type: "date"
				}, null, 512), [[w, S(d).date]])]), a("div", mt, [a("div", null, [c[42] ||= a("label", { class: "erag-form-label" }, "Start", -1), E(a("input", {
					"onUpdate:modelValue": c[9] ||= (e) => S(d).start = e,
					class: "erag-form-input",
					type: "time",
					onBlur: c[10] ||= (e) => S(d).start = S(B)(S(d).start)
				}, null, 544), [[w, S(d).start]])]), a("div", null, [c[43] ||= a("label", { class: "erag-form-label" }, "End", -1), E(a("input", {
					"onUpdate:modelValue": c[11] ||= (e) => S(d).end = e,
					class: "erag-form-input",
					type: "time",
					onBlur: c[12] ||= (e) => S(d).end = S(B)(S(d).end)
				}, null, 544), [[w, S(d).end]])])])]), S(_) ? (g(), i("div", ht, b(S(_)), 1)) : r("", !0)])]),
				a("div", gt, [c[45] ||= a("div", {
					class: "erag-field-icon",
					title: "Calendar"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z" }), a("path", { d: "m7 7-.01.01" })])], -1), a("div", _t, [E(a("select", {
					"onUpdate:modelValue": c[13] ||= (e) => S(d).cal = e,
					class: "erag-form-input"
				}, [(g(!0), i(e, null, y(t.calendars, (e) => (g(), i("option", {
					key: e.id,
					value: e.id
				}, b(e.label), 9, vt))), 128))], 512), [[C, S(d).cal]])])]),
				t.mentionUsersAllowed && t.mentionUsers.length ? (g(), i("div", yt, [c[47] ||= a("div", {
					class: "erag-field-icon",
					title: "Mentions"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), a("circle", {
					cx: "12",
					cy: "7",
					r: "4"
				})])], -1), a("div", bt, [a("div", {
					class: "erag-mention-select",
					onFocusout: c[18] ||= (e) => A.value = !1
				}, [a("div", {
					class: "erag-mention-control",
					onClick: c[17] ||= (...e) => S(k) && S(k)(...e)
				}, [(g(!0), i(e, null, y(S(I), (e) => (g(), i("span", {
					key: e.user_id,
					class: "erag-mention-chip"
				}, [s(b(e.name) + " ", 1), a("button", {
					type: "button",
					class: "erag-mention-remove",
					title: "Remove",
					onMousedown: O((t) => S(P)(e.user_id), ["stop", "prevent"])
				}, [...c[46] ||= [a("svg", {
					class: "erag-mention-remove-svg",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2.5",
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]], 40, xt)]))), 128)), E(a("input", {
					ref_key: "mentionSearchInput",
					ref: M,
					"onUpdate:modelValue": c[14] ||= (e) => u(j) ? j.value = e : null,
					class: "erag-mention-input",
					placeholder: "Search users...",
					onFocus: c[15] ||= (e) => A.value = !0,
					onKeydown: c[16] ||= D((e) => A.value = !1, ["esc"])
				}, null, 544), [[w, S(j)]])]), S(A) ? (g(), i("div", St, [S(x).length ? (g(), i("div", Ct, [(g(!0), i(e, null, y(S(x), (e) => (g(), i("button", {
					key: e.user_id,
					type: "button",
					class: "erag-mention-item",
					onMousedown: O((t) => S(te)(e), ["prevent"])
				}, b(e.name), 41, wt))), 128))])) : r("", !0), S(x).length ? r("", !0) : (g(), i("div", Tt, "No users found"))])) : r("", !0)], 32)])])) : r("", !0),
				a("div", Et, [c[48] ||= o("<div class=\"erag-field-icon\" title=\"Color\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line></svg></div>", 1), a("div", Dt, [a("div", Ot, [(g(!0), i(e, null, y(S(N), (e) => (g(), i("div", {
					key: e,
					class: p(["erag-cswatch", { "erag-sel": S(d).color === e }]),
					style: h({ background: e }),
					onClick: (t) => S(d).color = e
				}, null, 14, kt))), 128))]), a("div", At, [
					a("span", {
						class: "erag-custom-color-preview",
						style: h({ background: S(d).color })
					}, null, 4),
					E(a("input", {
						"onUpdate:modelValue": c[19] ||= (e) => S(d).color = e,
						class: "erag-custom-color-picker",
						type: "color",
						"aria-label": "Pick custom color"
					}, null, 512), [[w, S(d).color]]),
					a("input", {
						value: S(d).color,
						class: "erag-custom-color-input",
						maxlength: "7",
						placeholder: "#378ADD",
						onInput: c[20] ||= (e) => S(m)(e.target.value)
					}, null, 40, jt)
				])])]),
				a("div", Mt, [c[49] ||= o("<div class=\"erag-field-icon\" title=\"Notes\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></div>", 1), a("div", Nt, [E(a("textarea", {
					"onUpdate:modelValue": c[21] ||= (e) => S(d).desc = e,
					rows: "3",
					class: "erag-form-input",
					placeholder: "Add notes..."
				}, null, 512), [[w, S(d).desc]])])]),
				a("div", Pt, [
					S(d).id && t.permissions.delete ? (g(), i("button", {
						key: 0,
						class: "erag-btn erag-btn-danger",
						disabled: t.processing,
						onClick: c[22] ||= (e) => n.$emit("delete", { ...S(d) })
					}, "Delete", 8, Ft)) : r("", !0),
					a("button", {
						class: "erag-btn",
						onClick: c[23] ||= (e) => n.$emit("close")
					}, "Cancel"),
					(S(d).id ? t.permissions.update : t.permissions.create) ? (g(), i("button", {
						key: 1,
						class: "erag-btn erag-btn-primary",
						disabled: t.processing,
						onClick: c[24] ||= (...e) => S(f) && S(f)(...e)
					}, b(S(d).id ? "Update" : "Save"), 9, It)) : r("", !0)
				])
			], 64)) : (g(), i(e, { key: 2 }, [
				a("div", Lt, [E(a("input", {
					"onUpdate:modelValue": c[25] ||= (e) => H.value = e,
					class: "erag-title-input",
					placeholder: "Add title",
					autofocus: ""
				}, null, 512), [[w, H.value]])]),
				a("div", Rt, [c[50] ||= o("<div class=\"erag-field-icon\" title=\"Date\"><svg viewBox=\"0 0 24 24\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg></div>", 1), a("div", zt, [a("div", Bt, [E(a("input", {
					"onUpdate:modelValue": c[26] ||= (e) => U.value = e,
					class: "erag-form-input",
					type: "date",
					style: {
						"max-width": "160px",
						"margin-bottom": "0"
					}
				}, null, 512), [[w, U.value]]), G.value ? E((g(), i("input", {
					key: 0,
					"onUpdate:modelValue": c[27] ||= (e) => W.value = e,
					class: "erag-form-input",
					type: "time",
					style: {
						"max-width": "120px",
						"margin-bottom": "0"
					}
				}, null, 512)), [[w, W.value]]) : (g(), i("button", {
					key: 1,
					type: "button",
					class: "erag-add-time-btn",
					onClick: c[28] ||= (e) => G.value = !0
				}, " Add time "))])])]),
				a("div", Vt, [c[51] ||= o("<div class=\"erag-field-icon\" title=\"Add deadline\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle></svg></div>", 1), a("div", Ht, [a("span", {
					style: {
						color: "var(--text-muted)",
						"font-size": "13.5px",
						cursor: "pointer"
					},
					onClick: c[29] ||= (e) => G.value = !0
				}, "Add deadline")])]),
				a("div", Ut, [c[52] ||= o("<div class=\"erag-field-icon\" title=\"Description\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></div>", 1), a("div", Wt, [E(a("textarea", {
					"onUpdate:modelValue": c[30] ||= (e) => K.value = e,
					rows: "3",
					class: "erag-form-input",
					placeholder: "Add description or a Google Drive attachment"
				}, null, 512), [[w, K.value]])])]),
				a("div", Gt, [c[54] ||= o("<div class=\"erag-field-icon\" title=\"Task List\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line></svg></div>", 1), a("div", Kt, [E(a("select", {
					"onUpdate:modelValue": c[31] ||= (e) => q.value = e,
					class: "erag-task-list-select"
				}, [...c[53] ||= [
					a("option", { value: "My Tasks" }, "My Tasks", -1),
					a("option", { value: "Work Tasks" }, "Work Tasks", -1),
					a("option", { value: "Personal Tasks" }, "Personal Tasks", -1)
				]], 512), [[C, q.value]])])]),
				a("div", qt, [a("button", {
					class: "erag-btn",
					onClick: c[32] ||= (e) => n.$emit("close")
				}, "Cancel"), a("button", {
					class: "erag-btn erag-btn-primary",
					disabled: !H.value.trim(),
					onClick: ne
				}, "Save", 8, Jt)])
			], 64))
		], 64))])])) : r("", !0);
	}
});
//#endregion
//#region src/composables/useMonthGrid.ts
function Xt(e, n) {
	return { cells: t(() => {
		let t = e().getFullYear(), r = e().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r, 1 - i), o = I(/* @__PURE__ */ new Date());
		return Array.from({ length: 42 }, (e, t) => {
			let i = new Date(a);
			i.setDate(i.getDate() + t);
			let s = I(i);
			return {
				date: i,
				events: $(n(), s),
				other: i.getMonth() !== r,
				today: s === o,
				value: s
			};
		});
	}) };
}
//#endregion
//#region src/components/MonthView.vue?vue&type=script&setup=true&lang.ts
var Zt = { class: "erag-month-wrap" }, Qt = { class: "erag-month-dow-row" }, $t = { class: "erag-month-grid" }, en = ["onClick"], tn = { class: "erag-day-num" }, nn = ["onClick"], rn = {
	key: 0,
	class: "erag-more"
}, an = /* @__PURE__ */ l({
	__name: "MonthView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { cells: o } = Xt(() => n.currentDate, () => n.events);
		return (t, n) => (g(), i("div", Zt, [a("div", Qt, [(g(!0), i(e, null, y(S(j), (e) => (g(), i("div", {
			key: e,
			class: "erag-dow"
		}, b(e), 1))), 128))]), a("div", $t, [(g(!0), i(e, null, y(S(o), (n) => (g(), i("div", {
			key: n.value,
			class: p(["erag-cell", {
				"erag-other-month": n.other,
				"erag-today": n.today
			}]),
			onClick: (e) => t.$emit("add", n.value)
		}, [
			a("div", tn, b(n.date.getDate()), 1),
			(g(!0), i(e, null, y(n.events.slice(0, 3), (e) => (g(), i("div", {
				key: S(X)(e),
				class: "erag-pill",
				style: h({
					background: `${e.color}22`,
					color: e.color
				}),
				onClick: O((n) => t.$emit("detail", e), ["stop"])
			}, b(e.start === "00:00" ? "" : `${S(z)(e.start)} `) + b(e.title), 13, nn))), 128)),
			n.events.length > 3 ? (g(), i("div", rn, "+" + b(n.events.length - 3) + " more", 1)) : r("", !0)
		], 10, en))), 128))])]));
	}
});
//#endregion
//#region src/composables/useWeekGrid.ts
function on(e, n) {
	let r = t(() => I(/* @__PURE__ */ new Date())), { hours: i, nowTop: a } = ie();
	return {
		eventsFor: (e) => $(n(), e),
		eventStyle: Z,
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
var sn = { class: "erag-week-wrap" }, cn = { class: "erag-week-head" }, ln = { class: "erag-wday-name" }, un = { class: "erag-wday-num" }, dn = { class: "erag-week-scroll" }, fn = { class: "erag-time-col" }, pn = { class: "erag-time-label" }, mn = ["onClick"], hn = ["onClick"], gn = /* @__PURE__ */ l({
	__name: "WeekView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { eventsFor: o, eventStyle: s, hours: c, nowTop: l, today: u, weekDays: d } = on(() => n.currentDate, () => n.events);
		return (t, n) => (g(), i("div", sn, [a("div", cn, [n[0] ||= a("div", { class: "erag-wgutter" }, null, -1), (g(!0), i(e, null, y(S(d), (e) => (g(), i("div", {
			key: S(I)(e),
			class: p(["erag-wday-head", { "erag-today": S(I)(e) === S(u) }])
		}, [a("div", ln, b(S(j)[e.getDay()]), 1), a("div", un, b(e.getDate()), 1)], 2))), 128))]), a("div", dn, [a("div", fn, [(g(!0), i(e, null, y(S(c), (e) => (g(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", pn, b(e === 0 ? "" : S(z)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), (g(!0), i(e, null, y(S(d), (d) => (g(), i("div", {
			key: S(I)(d),
			class: "erag-wcol"
		}, [
			(g(!0), i(e, null, y(S(c), (e) => (g(), i("div", {
				key: e,
				class: "erag-wslot",
				onClick: (e) => t.$emit("add", S(I)(d))
			}, null, 8, mn))), 128)),
			(g(!0), i(e, null, y(S(o)(d), (e) => (g(), i("div", {
				key: S(X)(e),
				class: "erag-wevent",
				style: h(S(s)(e)),
				onClick: O((n) => t.$emit("detail", e), ["stop"])
			}, b(S(z)(e.start)) + " " + b(e.title), 13, hn))), 128)),
			S(I)(d) === S(u) ? (g(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: h({ top: `${S(l)}px` })
			}, [...n[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		]))), 128))])]));
	}
}), _n = { class: "erag-settings-container" }, vn = { class: "erag-settings-section" }, yn = { class: "erag-sync-card" }, bn = { class: "erag-sync-row" }, xn = { class: "erag-sync-row" }, Sn = { class: "erag-settings-section" }, Cn = { class: "erag-dropdown-wrapper" }, wn = { class: "erag-duration-text" }, Tn = { class: "erag-duration-value" }, En = {
	key: 0,
	class: "erag-duration-menu"
}, Dn = ["onClick"], On = { class: "erag-settings-section" }, kn = { class: "erag-impexp-container" }, An = { class: "erag-impexp-box" }, jn = {
	class: "erag-btn erag-btn-task",
	style: {
		display: "inline-flex",
		cursor: "pointer"
	}
}, Mn = /* @__PURE__ */ l({
	__name: "SettingsView",
	setup(t) {
		let n = v(!1), c = v(!1), l = v(60), u = v(!1), d = [
			15,
			20,
			30,
			45,
			60,
			90,
			120
		], f = () => {
			n.value = !n.value;
		}, m = () => {
			c.value = !c.value;
		}, h = (e) => {
			l.value = e, u.value = !1;
		}, ee = (e) => {
			let t = e.target;
			t.files && t.files.length && alert(`Imported file: ${t.files[0].name}`);
		}, _ = () => {
			let e = JSON.stringify({ message: "Calendar Export Data" }), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "calendar-export.json", r.click();
		};
		return (t, v) => (g(), i("div", _n, [
			a("div", vn, [v[3] ||= a("h2", { class: "erag-settings-title" }, "Sync Settings", -1), a("div", yn, [a("div", bn, [v[1] ||= o("<div class=\"erag-sync-info\"><svg class=\"erag-sync-logo\" viewBox=\"0 0 24 24\"><path fill=\"#EA4335\" d=\"M12 5.04c1.78 0 3.39.61 4.65 1.8l3.48-3.48C17.98 1.19 15.22 0 12 0 7.31 0 3.25 2.69 1.25 6.63l4.08 3.16c.96-2.88 3.66-4.75 6.67-4.75z\"></path><path fill=\"#4285F4\" d=\"M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.55z\"></path><path fill=\"#FBBC05\" d=\"M5.33 14.78a7.12 7.12 0 0 1 0-4.56L1.25 7.06a11.96 11.96 0 0 0 0 9.88l4.08-3.16z\"></path><path fill=\"#34A853\" d=\"M12 23.04c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.01 0-5.71-1.88-6.67-4.75L1.25 16.77c2 3.94 6.06 6.27 10.75 6.27z\"></path></svg><div class=\"erag-sync-text-group\"><span class=\"erag-sync-name\">Google Calendar</span><span class=\"erag-sync-desc\">Sync events with your Google account</span></div></div>", 1), a("button", {
				type: "button",
				class: p(["erag-btn", { "erag-btn-task": n.value }]),
				onClick: f
			}, b(n.value ? "Connected" : "Sync"), 3)]), a("div", xn, [v[2] ||= o("<div class=\"erag-sync-info\"><svg class=\"erag-sync-logo\" viewBox=\"0 0 23 23\"><path fill=\"#f35325\" d=\"M0 0h11v11H0z\"></path><path fill=\"#80bb0a\" d=\"M12 0h11v11H12z\"></path><path fill=\"#00a1f1\" d=\"M0 12h11v11H0z\"></path><path fill=\"#ffb900\" d=\"M12 12h11v11H12z\"></path></svg><div class=\"erag-sync-text-group\"><span class=\"erag-sync-name\">Microsoft Outlook</span><span class=\"erag-sync-desc\">Sync events with your Outlook calendar</span></div></div>", 1), a("button", {
				type: "button",
				class: p(["erag-btn", { "erag-btn-task": c.value }]),
				onClick: m
			}, b(c.value ? "Connected" : "Sync"), 3)])])]),
			a("div", Sn, [v[6] ||= a("h2", { class: "erag-settings-title" }, "Event settings", -1), a("div", Cn, [a("div", {
				class: "erag-duration-trigger",
				onClick: v[0] ||= (e) => u.value = !u.value
			}, [a("div", wn, [v[4] ||= a("span", { class: "erag-duration-label" }, "Default duration", -1), a("span", Tn, b(l.value) + " minutes", 1)]), v[5] ||= a("svg", {
				class: "erag-duration-caret",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5"
			}, [a("path", { d: "m6 9 6 6 6-6" })], -1)]), u.value ? (g(), i("div", En, [(g(), i(e, null, y(d, (e) => a("div", {
				key: e,
				class: p(["erag-duration-item", { "erag-selected": l.value === e }]),
				onClick: (t) => h(e)
			}, b(e) + " minutes ", 11, Dn)), 64))])) : r("", !0)])]),
			a("div", On, [a("div", kn, [a("div", An, [
				v[8] ||= a("h2", {
					class: "erag-impexp-header",
					style: {
						color: "#1d4ed8",
						"font-size": "20px"
					}
				}, "Import", -1),
				v[9] ||= a("p", { class: "erag-impexp-desc" }, "Upload event data files (.ics or .json) to load them into the calendar.", -1),
				a("label", jn, [v[7] ||= s(" Choose file ", -1), a("input", {
					type: "file",
					accept: ".ics,.json",
					style: { display: "none" },
					onChange: ee
				}, null, 32)])
			]), a("div", { class: "erag-impexp-box" }, [
				v[10] ||= a("h2", {
					class: "erag-impexp-header",
					style: {
						color: "#1d4ed8",
						"font-size": "20px"
					}
				}, "Export", -1),
				v[11] ||= a("p", { class: "erag-impexp-desc" }, "Download all your calendar events to backup or migrate your data.", -1),
				a("button", {
					type: "button",
					class: "erag-btn",
					onClick: _
				}, " Export ")
			])])])
		]));
	}
}), Nn = {
	key: 1,
	class: "erag-cal-root"
}, Pn = { class: "erag-body" }, Fn = { class: "erag-main" }, In = /* @__PURE__ */ l({
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
		"update",
		"create-task"
	],
	setup(e, { emit: o }) {
		let s = e, l = o, { calendarOptions: u, config: f, mentionUsers: p, permissions: h, routes: ee, shouldPersist: _ } = q(s), y = W(x(() => u.value)), b = re(ee.value, s.visitOptions), { closeModal: C, modalMode: w, modalOpen: T, openCreate: E, openDetail: D, openEdit: O, selectedDate: k, selectedEvent: A } = G(y.currentDate, () => h.value.create, () => h.value.update), { deleteEvent: j, saveEvent: M } = K({
			calendar: y,
			canDelete: () => h.value.delete,
			closeModal: C,
			emit: {
				create: (e) => l("create", e),
				delete: (e) => l("delete", e),
				update: (e) => l("update", e)
			},
			inertiaEvents: b,
			shouldPersist: _
		}), N = v("event"), P = (e) => {
			N.value = "event", E(e);
		}, F = () => {
			N.value = "task", E();
		}, I = (e) => {
			console.log("[calendar UI] task created:", e), l("create-task", e);
		}, L = t(() => ({
			...y,
			errors: b.errors,
			processing: b.processing,
			closeModal: C,
			deleteEvent: j,
			modalMode: w,
			modalOpen: T,
			openCreate: P,
			openDetail: D,
			openEdit: O,
			saveEvent: M,
			selectedDate: k,
			selectedEvent: A
		}));
		return (t, o) => e.headless ? te(t.$slots, "default", m(d({ key: 0 }, L.value))) : (g(), i("div", Nn, [
			c(Ie, {
				search: S(y).search.value,
				"can-create": S(h).create,
				title: S(y).title.value,
				view: S(y).currentView.value,
				onAdd: o[0] ||= (e) => P(),
				onNext: o[1] ||= (e) => S(y).navigate(1),
				onPrev: o[2] ||= (e) => S(y).navigate(-1),
				onSearch: o[3] ||= (e) => S(y).search.value = e,
				onSidebarToggle: o[4] ||= (e) => S(y).sidebarOpen.value = !S(y).sidebarOpen.value,
				onToday: o[5] ||= (e) => S(y).goToday(),
				onView: o[6] ||= (e) => S(y).setView(e)
			}, null, 8, [
				"search",
				"can-create",
				"title",
				"view"
			]),
			a("div", Pn, [S(f).sidebar === !1 ? r("", !0) : (g(), n(Se, {
				key: 0,
				calendars: S(y).calendars.value,
				"current-date": S(y).currentDate.value,
				"mini-date": S(y).miniDate.value,
				open: S(y).sidebarOpen.value,
				"visible-calendars": S(y).visibleCalendars.value,
				onAdd: o[7] ||= (e) => P(),
				onAddTask: o[8] ||= (e) => F(),
				onMiniNext: o[9] ||= (e) => S(y).miniDate.value = new Date(S(y).miniDate.value.getFullYear(), S(y).miniDate.value.getMonth() + 1, 1),
				onMiniPrev: o[10] ||= (e) => S(y).miniDate.value = new Date(S(y).miniDate.value.getFullYear(), S(y).miniDate.value.getMonth() - 1, 1),
				onSelectDate: o[11] ||= (e) => S(y).selectDate(e),
				onToggleCalendar: o[12] ||= (e) => S(y).toggleCalendar(e)
			}, null, 8, [
				"calendars",
				"current-date",
				"mini-date",
				"open",
				"visible-calendars"
			])), a("main", Fn, [S(y).currentView.value === "month" ? (g(), n(an, {
				key: 0,
				"current-date": S(y).currentDate.value,
				events: S(y).filteredEvents.value,
				onAdd: P,
				onDetail: S(D)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : S(y).currentView.value === "week" ? (g(), n(gn, {
				key: 1,
				"current-date": S(y).currentDate.value,
				events: S(y).filteredEvents.value,
				onAdd: P,
				onDetail: S(D)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : S(y).currentView.value === "day" ? (g(), n(Ge, {
				key: 2,
				"current-date": S(y).currentDate.value,
				events: S(y).filteredEvents.value,
				onAdd: P,
				onDetail: S(D)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : S(y).currentView.value === "agenda" ? (g(), n(fe, {
				key: 3,
				"current-date": S(y).currentDate.value,
				events: S(y).filteredEvents.value,
				onDetail: S(D)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : (g(), n(Mn, { key: 4 }))])]),
			c(Yt, {
				calendars: S(y).calendars.value,
				event: S(A),
				"mention-users": S(p),
				"mention-users-allowed": S(f).mention_users !== !1,
				mode: S(w),
				open: S(T),
				"initial-tab": N.value,
				permissions: S(h),
				processing: S(b).processing.value,
				"selected-date": S(k),
				onClose: S(C),
				onDelete: S(j),
				onEdit: S(O),
				onSave: S(M),
				onSaveTask: I
			}, null, 8, [
				"calendars",
				"event",
				"mention-users",
				"mention-users-allowed",
				"mode",
				"open",
				"initial-tab",
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
}), Ln = { install(e) {
	e.component("InertiaCalendar", In);
} };
//#endregion
export { fe as AgendaView, In as Calendar, In as InertiaCalendar, Se as CalendarSidebar, Ie as CalendarToolbar, Ge as DayView, Yt as EventModal, an as MonthView, gn as WeekView, Ke as calendarLabel, I as dateToString, j as days, Ln as default, X as eventKey, Z as eventTimeStyle, $ as eventsForDate, V as formatLongDate, H as formatMonthYear, z as formatTime, U as formatWeekRange, Ce as inputValue, qe as mentionedUsersLabel, A as months, B as normalizeTime, L as parseDate, M as shortDays, Q as sortEventsByTime, N as swatchColors, R as timeToMinutes, ae as useAgendaGroups, W as useCalendar, G as useCalendarModal, K as useCalendarMutations, q as useCalendarResource, Le as useDaySchedule, Je as useEventForm, re as useInertiaCalendarEvents, Ye as useMentionUsers, me as useMiniCalendar, Xt as useMonthGrid, ie as useTimeSlots, on as useWeekGrid, P as views };

//# sourceMappingURL=inertia-calendar.js.map