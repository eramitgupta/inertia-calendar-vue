import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createStaticVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, isRef as u, mergeModels as d, mergeProps as f, nextTick as p, normalizeClass as m, normalizeProps as h, normalizeStyle as g, onMounted as _, onUnmounted as v, openBlock as y, reactive as b, ref as x, renderList as S, renderSlot as C, toDisplayString as w, toRef as T, unref as E, useAttrs as D, useModel as O, vModelText as k, watch as A, withDirectives as j, withKeys as M, withModifiers as N } from "vue";
import { useHttp as P } from "@inertiajs/vue3";
//#region src/constants.ts
var F = [
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
], I = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], L = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
], R = [
	"#378ADD",
	"#1D9E75",
	"#D85A30",
	"#D4537E",
	"#7F77DD",
	"#BA7517",
	"#E24B4A",
	"#444441"
], z = [
	"month",
	"week",
	"day",
	"agenda"
], B = (e) => String(e).padStart(2, "0"), V = (e) => `${e.getFullYear()}-${B(e.getMonth() + 1)}-${B(e.getDate())}`, H = (e) => {
	if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
	let [t = 1970, n = 1, r = 1] = String(e).split("-").map(Number);
	return new Date(t, n - 1, r);
}, U = (e) => {
	let [t = 0, n = 0] = G(e).split(":").map(Number);
	return t * 60 + n;
}, W = (e) => {
	let [t = 0, n = 0] = G(e).split(":").map(Number), r = t >= 12 ? "pm" : "am";
	return `${t % 12 || 12}${n ? `:${B(n)}` : ""}${r}`;
}, G = (e) => {
	let t = String(e || "00:00").trim(), n = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
	if (!n) return t.slice(0, 5);
	let r = Number(n[1] || 0), i = Number(n[2] || 0), a = n[3]?.toLowerCase();
	return a === "pm" && r < 12 && (r += 12), a === "am" && r === 12 && (r = 0), `${B(r)}:${B(i)}`;
}, K = (e) => `${I[e.getDay()]}, ${F[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`, q = (e) => `${F[e.getMonth()]} ${e.getFullYear()}`, J = (e) => {
	let t = new Date(e);
	t.setDate(t.getDate() - t.getDay());
	let n = new Date(t);
	return n.setDate(n.getDate() + 6), t.getMonth() === n.getMonth() ? `${F[t.getMonth()]} ${t.getDate()}-${n.getDate()}, ${t.getFullYear()}` : `${F[t.getMonth()]} ${t.getDate()} - ${F[n.getMonth()]} ${n.getDate()}`;
};
function Y(e = {}) {
	let n = t(() => "value" in e ? e.value : e), r = /* @__PURE__ */ new Date(), i = x(n.value.initialDate ? H(n.value.initialDate) : new Date(r.getFullYear(), r.getMonth(), r.getDate())), a = x(new Date(i.value.getFullYear(), i.value.getMonth(), 1)), o = x(n.value.initialView || "month"), s = x(n.value.sidebarOpen ?? !0), c = x(""), l = x([...n.value.calendars || []]), u = x([...n.value.events || []]), d = x(new Set(l.value.map((e) => e.id)));
	A(() => n.value.events, (e) => {
		Array.isArray(e) && (u.value = [...e]);
	}), A(() => n.value.calendars, (e) => {
		Array.isArray(e) && e.length && (l.value = [...e], d.value = new Set(e.map((e) => e.id)));
	}), A(() => n.value.sidebarOpen, (e) => {
		typeof e == "boolean" && (s.value = e);
	});
	let f = t(() => o.value === "month" ? q(i.value) : o.value === "week" ? J(i.value) : o.value === "day" ? K(i.value) : "Agenda"), p = t(() => u.value.filter((e) => d.value.has(e.cal) ? !c.value || e.title.toLowerCase().includes(c.value.toLowerCase()) : !1)), m = () => Math.max(0, ...u.value.map((e) => Number(e.id)).filter(Number.isFinite)) + 1;
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
		formatLongDate: K,
		formatMonthYear: q,
		formatTime: W,
		formatWeekRange: J,
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
			i.value = H(e);
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
//#region src/composables/useEventLayout.ts
var X = 48, Z = (e) => e.id ?? `${e.date}-${e.start}-${e.title}`, ee = (e, t = 20) => ({
	top: `${U(e.start) * X / 60}px`,
	height: `${Math.max((U(e.end) - U(e.start)) * X / 60, t)}px`,
	background: `${e.color}22`,
	color: e.color,
	borderLeft: `3px solid ${e.color}`
}), te = (e) => [...e].sort((e, t) => U(e.start) - U(t.start)), Q = (e, t) => {
	let n = typeof t == "string" ? t : V(t);
	return te(e.filter((e) => e.date === n));
};
function ne() {
	return {
		hours: t(() => Array.from({ length: 24 }, (e, t) => t)),
		nowTop: t(() => {
			let e = /* @__PURE__ */ new Date();
			return (e.getHours() * 60 + e.getMinutes()) * X / 60;
		})
	};
}
//#endregion
//#region src/composables/useAgendaGroups.ts
function re(e, n) {
	return { groupedEvents: t(() => {
		let t = new Date(e()), r = new Date(t);
		r.setDate(r.getDate() + 14);
		let i = /* @__PURE__ */ new Map();
		return n().filter((e) => {
			let n = H(e.date);
			return n >= t && n <= r;
		}).sort((e, t) => `${e.date} ${e.start}`.localeCompare(`${t.date} ${t.start}`)).forEach((e) => {
			let t = i.get(e.date) || [];
			i.set(e.date, te([...t, e]));
		}), Array.from(i.entries()).map(([e, t]) => ({
			date: e,
			events: t,
			isToday: e === V(/* @__PURE__ */ new Date())
		}));
	}) };
}
//#endregion
//#region src/components/AgendaView.vue?vue&type=script&setup=true&lang.ts
var ie = {
	key: 0,
	class: "erag-agenda-wrap"
}, ae = ["onClick"], oe = { class: "erag-atime" }, se = { class: "erag-atitle" }, ce = {
	key: 0,
	class: "erag-adesc"
}, le = {
	key: 1,
	class: "erag-empty"
}, ue = /* @__PURE__ */ l({
	__name: "AgendaView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["detail"],
	setup(t) {
		let n = t, { groupedEvents: o } = re(() => n.currentDate, () => n.events);
		return (t, n) => E(o).length ? (y(), i("div", ie, [(y(!0), i(e, null, S(E(o), (n) => (y(), i("div", {
			key: n.date,
			class: "erag-agenda-group"
		}, [a("div", { class: m(["erag-agenda-date", { "erag-today-hdr": n.isToday }]) }, w(E(K)(E(H)(n.date))), 3), (y(!0), i(e, null, S(n.events, (e) => (y(), i("div", {
			key: E(Z)(e),
			class: "erag-agenda-ev",
			onClick: (n) => t.$emit("detail", e)
		}, [
			a("div", {
				class: "erag-acolor",
				style: g({ background: e.color })
			}, null, 4),
			a("div", oe, w(E(W)(e.start)) + " - " + w(E(W)(e.end)), 1),
			a("div", null, [a("div", se, w(e.title), 1), e.desc ? (y(), i("div", ce, w(e.desc), 1)) : r("", !0)])
		], 8, ae))), 128))]))), 128))])) : (y(), i("div", le, "No events"));
	}
});
//#endregion
//#region src/composables/useCalendarModal.ts
function de(e, t, n) {
	let r = x(!1), i = x("create"), a = x(""), o = x(null);
	return {
		closeModal: () => {
			r.value = !1, o.value = null;
		},
		modalMode: i,
		modalOpen: r,
		openCreate: (n) => {
			t() && (a.value = n || V(e.value), o.value = null, i.value = "create", r.value = !0);
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
function fe({ calendar: e, canDelete: t, closeModal: n, emit: r, inertiaEvents: i, shouldPersist: a }) {
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
function pe(e) {
	let n = t(() => e.resource || e.calendar), r = t(() => ({
		...n.value?.config || {},
		...e.config
	})), i = t(() => ({
		create: !0,
		update: !0,
		delete: !0,
		...n.value?.permissions || {},
		...r.value.permissions || {},
		...e.permissions
	})), a = t(() => ({
		...n.value?.routes || {},
		...r.value.routes || {},
		...e.routes
	})), o = t(() => e.mentionUsers ?? r.value.mentionUsers ?? n.value?.mentionUsers ?? []), s = t(() => !!(a.value.create || a.value.store || a.value.update || a.value.delete || a.value.destroy)), c = t(() => !!(e.persistWithInertia ?? r.value.persistWithInertia ?? s.value));
	return {
		calendarOptions: t(() => ({
			calendars: e.calendars ?? r.value.calendars ?? n.value?.data?.calendars,
			events: e.events ?? r.value.events ?? n.value?.data?.events,
			initialDate: e.initialDate ?? r.value.initialDate ?? n.value?.data?.initialDate,
			initialView: e.initialView ?? r.value.initialView ?? n.value?.data?.initialView,
			sidebarOpen: e.sidebarOpen ?? r.value.sidebarOpen ?? r.value.sidebar ?? n.value?.data?.sidebarOpen
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
var me = {
	create: null,
	store: null,
	update: null,
	delete: null,
	destroy: null
}, he = (e, t) => typeof e == "function" ? e(t) : e && t?.id ? e.replace(":id", String(t.id)) : e || null;
function ge(e = {}, n = {}) {
	let r = {
		...me,
		...e
	}, i = P({}), a = t(() => i.errors), o = t(() => i.processing), s = (e, t, r = {}, a = {}) => t ? (i.transform(() => r), i[e](t, {
		...n,
		...a
	}).catch(() => null)) : Promise.resolve(null);
	return {
		errors: a,
		processing: o,
		createEvent: (e, t = {}) => s("post", he(r.create || r.store, e), e, t),
		updateEvent: (e, t = {}) => s("put", he(r.update, e), e, t),
		deleteEvent: (e, t = {}) => s("delete", he(r.delete || r.destroy, e), {}, t)
	};
}
//#endregion
//#region src/composables/useMiniCalendar.ts
var _e = (e) => String(e).padStart(2, "0");
function ve(e, n) {
	let r = t(() => `${F[n().getMonth()].slice(0, 3)} ${n().getFullYear()}`);
	return {
		miniDays: t(() => {
			let t = n().getFullYear(), r = n().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r + 1, 0).getDate(), o = V(/* @__PURE__ */ new Date()), s = V(e()), c = [];
			for (let e = 0; e < i; e += 1) c.push({
				label: new Date(t, r, -(i - e - 1)).getDate(),
				other: !0
			});
			for (let e = 1; e <= a; e += 1) {
				let n = `${t}-${_e(r + 1)}-${_e(e)}`;
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
		parseMiniDate: (e) => H(e)
	};
}
//#endregion
//#region src/components/CalendarSidebar.vue?vue&type=script&setup=true&lang.ts
var ye = { class: "erag-mini-header" }, be = { class: "erag-mini-title" }, xe = { class: "erag-mini-nav-group" }, Se = { class: "erag-mini-grid" }, Ce = ["onClick"], we = ["onClick"], Te = { class: "erag-sidebar-actions" }, Ee = /* @__PURE__ */ l({
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
		let n = t, { miniDays: r, miniTitle: o, parseMiniDate: c } = ve(() => n.currentDate, () => n.miniDate);
		return (n, l) => (y(), i("div", { class: m(["erag-sidebar", { "erag-collapsed": !t.open }]) }, [
			a("div", null, [a("div", ye, [a("span", be, w(E(o)), 1), a("div", xe, [a("button", {
				class: "erag-mini-nav",
				title: "Previous month",
				onClick: l[0] ||= (e) => n.$emit("mini-prev")
			}, [...l[4] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m15 18-6-6 6-6" })], -1)]]), a("button", {
				class: "erag-mini-nav",
				title: "Next month",
				onClick: l[1] ||= (e) => n.$emit("mini-next")
			}, [...l[5] ||= [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m9 18 6-6-6-6" })], -1)]])])]), a("div", Se, [(y(!0), i(e, null, S(E(L), (e) => (y(), i("div", {
				key: e,
				class: "erag-mini-dow"
			}, w(e), 1))), 128)), (y(!0), i(e, null, S(E(r), (e, t) => (y(), i("div", {
				key: `${e.date || "other"}-${t}`,
				class: m(["erag-mini-day", {
					"erag-other": e.other,
					"erag-today": e.today,
					"erag-selected": e.selected
				}]),
				onClick: (t) => e.date && n.$emit("select-date", E(c)(e.date))
			}, w(e.label), 11, Ce))), 128))])]),
			a("div", null, [l[6] ||= a("div", { class: "erag-legend-label" }, "Calendars", -1), a("div", null, [(y(!0), i(e, null, S(t.calendars, (e) => (y(), i("div", {
				key: e.id,
				class: "erag-legend-item",
				onClick: (t) => n.$emit("toggle-calendar", e.id)
			}, [a("div", {
				class: "erag-legend-dot",
				style: g({
					background: t.visibleCalendars.has(e.id) ? e.color : "#cbd5e1",
					borderColor: t.visibleCalendars.has(e.id) ? "transparent" : "rgba(0,0,0,0.1)"
				})
			}, null, 4), a("span", { class: m({ "erag-active": t.visibleCalendars.has(e.id) }) }, w(e.label), 3)], 8, we))), 128))])]),
			a("div", Te, [a("button", {
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
}), De = (e) => e.target.value, Oe = { class: "erag-toolbar" }, ke = { class: "erag-toolbar-left" }, Ae = { class: "erag-cal-title" }, je = { class: "erag-toolbar-right" }, Me = { class: "erag-search-bar" }, Ne = ["value"], Pe = { style: {
	display: "flex",
	"align-items": "center",
	gap: "8px"
} }, Fe = { class: "erag-view-tabs" }, Ie = ["onClick"], Le = {
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
}, Re = ["value"], ze = ["value"], Be = /* @__PURE__ */ l({
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
		return (n, o) => (y(), i("div", Oe, [a("div", ke, [
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
			a("span", Ae, w(t.title), 1)
		]), a("div", je, [
			a("div", Me, [o[11] ||= a("svg", {
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
				onInput: o[4] ||= (e) => n.$emit("search", E(De)(e))
			}, null, 40, Ne)]),
			a("div", Pe, [a("div", Fe, [(y(!0), i(e, null, S(E(z), (e) => (y(), i("button", {
				key: e,
				class: m(["erag-view-tab", { "erag-active": t.view === e }]),
				onClick: (t) => n.$emit("view", e)
			}, w(e[0].toUpperCase() + e.slice(1)), 11, Ie))), 128))]), a("button", {
				class: m(["erag-btn erag-btn-icon erag-settings-toggle-btn", { "erag-active": t.view === "settings" }]),
				title: "Settings",
				onClick: o[5] ||= (e) => n.$emit("view", "settings")
			}, [(y(), i("svg", Le, [...o[12] ||= [a("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }, null, -1), a("circle", {
				cx: "12",
				cy: "12",
				r: "3"
			}, null, -1)]]))], 2)]),
			a("select", {
				class: "erag-btn erag-mobile-sel",
				value: t.view,
				onChange: o[6] ||= (e) => n.$emit("view", E(De)(e))
			}, [(y(!0), i(e, null, S(E(z), (e) => (y(), i("option", {
				key: e,
				value: e
			}, w(e[0].toUpperCase() + e.slice(1)), 9, ze))), 128)), o[13] ||= a("option", { value: "settings" }, "Settings", -1)], 40, Re),
			t.canCreate ? (y(), i("button", {
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
function Ve(e, n) {
	let r = t(() => V(e())), i = t(() => V(/* @__PURE__ */ new Date())), a = t(() => Q(n(), r.value)), { hours: o, nowTop: s } = ne();
	return {
		date: r,
		dayEvents: a,
		eventStyle: ee,
		hours: o,
		nowTop: s,
		today: i
	};
}
//#endregion
//#region src/components/DayView.vue?vue&type=script&setup=true&lang.ts
var He = { class: "erag-day-wrap" }, Ue = { class: "erag-day-hdr" }, We = { class: "erag-day-scroll" }, Ge = { class: "erag-time-col" }, Ke = { class: "erag-time-label" }, qe = { class: "erag-dcol" }, Je = ["onClick"], Ye = /* @__PURE__ */ l({
	__name: "DayView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { date: o, dayEvents: s, eventStyle: c, hours: l, nowTop: u, today: d } = Ve(() => n.currentDate, () => n.events);
		return (n, f) => (y(), i("div", He, [a("div", Ue, w(E(K)(t.currentDate)), 1), a("div", We, [a("div", Ge, [(y(!0), i(e, null, S(E(l), (e) => (y(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", Ke, w(e === 0 ? "" : E(W)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), a("div", qe, [
			(y(!0), i(e, null, S(E(l), (e) => (y(), i("div", {
				key: e,
				class: "erag-dslot",
				onClick: f[0] ||= (e) => n.$emit("add", E(o))
			}))), 128)),
			(y(!0), i(e, null, S(E(s), (e) => (y(), i("div", {
				key: E(Z)(e),
				class: "erag-devent",
				style: g(E(c)(e, 28)),
				onClick: N((t) => n.$emit("detail", e), ["stop"])
			}, w(E(W)(e.start)) + "-" + w(E(W)(e.end)) + " " + w(e.title), 13, Je))), 128)),
			E(o) === E(d) ? (y(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: g({ top: `${E(u)}px` })
			}, [...f[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		])])]));
	}
});
//#endregion
//#region src/composables/useBodyScrollLock.ts
function Xe(e, t = "erag-no-scroll") {
	let n = (e) => {
		document.body.classList.toggle(t, e);
	};
	A(e, n, { immediate: !0 }), v(() => {
		n(!1);
	});
}
//#endregion
//#region src/composables/useCalendarLabels.ts
var Ze = (e, t) => e.find((e) => e.id === t.cal)?.label || t.cal, Qe = (e, t) => {
	let n = t.mentioned_user_ids || [];
	return e.filter((e) => n.includes(e.user_id)).map((e) => e.name).join(", ");
}, $e = "#000000";
function et({ calendars: e, event: t, onSave: n, open: r, selectedDate: i }) {
	let a = x(""), o = b({
		id: null,
		title: "",
		date: "",
		start: "09:00",
		end: "10:00",
		cal: "",
		color: $e,
		desc: "",
		mentioned_user_ids: []
	}), s = () => {
		let n = t(), r = e()[0] || {
			id: "work",
			color: $e
		};
		o.id = n?.id || null, o.title = n?.title || "", o.date = n?.date || i() || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), o.start = G(n?.start || "09:00"), o.end = G(n?.end || "10:00"), o.cal = n?.cal || r.id, o.color = n?.color || r.color || $e, o.desc = n?.desc || "", o.mentioned_user_ids = [...n?.mentioned_user_ids || []], a.value = "";
	};
	return A(() => [
		e(),
		t(),
		r?.(),
		i()
	], s, { immediate: !0 }), {
		form: o,
		resetForm: s,
		save: () => {
			if (!o.title.trim()) return;
			let e = G(o.start), t = G(o.end);
			if (U(t) < U(e)) {
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
//#region src/composables/useEventTaskForm.ts
var tt = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function nt({ initialTab: e, onSave: t, open: n, selectedDate: r }) {
	let i = b({
		activeTab: "event",
		date: "",
		desc: "",
		list: "My Tasks",
		time: "12:00",
		timeEnabled: !1,
		title: ""
	}), a = () => {
		i.title = "", i.date = r() || tt(), i.time = "12:00", i.timeEnabled = !1, i.desc = "", i.list = "My Tasks";
	};
	return A(() => [
		n(),
		e(),
		r()
	], ([t]) => {
		t && (i.activeTab = e(), a());
	}, { immediate: !0 }), {
		enableTime: () => {
			i.timeEnabled = !0;
		},
		resetTask: a,
		saveTask: () => {
			let e = i.title.trim();
			e && t({
				allDay: !i.timeEnabled,
				date: i.date,
				desc: i.desc,
				list: i.list,
				time: i.timeEnabled ? i.time : "",
				title: e
			});
		},
		task: i
	};
}
//#endregion
//#region src/composables/useMentionUsers.ts
function rt(e, n) {
	let r = x(""), i = x(null), a = x(!1), o = t(() => e.mentioned_user_ids || []), s = t(() => n().filter((e) => o.value.includes(e.user_id)));
	return {
		addMentionUser: (t) => {
			e.mentioned_user_ids?.includes(t.user_id) || (e.mentioned_user_ids = [...e.mentioned_user_ids || [], t.user_id]), r.value = "", a.value = !1;
		},
		availableMentionUsers: t(() => {
			let e = r.value.trim().toLowerCase();
			return n().filter((t) => o.value.includes(t.user_id) ? !1 : !e || t.name.toLowerCase().includes(e));
		}),
		focusMentionSearch: async () => {
			a.value = !0, await p(), i.value?.focus();
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
//#region src/components/DatePicker.vue?vue&type=script&setup=true&lang.ts
var it = { class: "erag-date-menu-head" }, at = { class: "erag-date-title" }, ot = { class: "erag-date-grid erag-date-weekdays" }, st = { class: "erag-date-grid" }, ct = ["onClick"], lt = /* @__PURE__ */ l({
	__name: "DatePicker",
	props: { modelValue: { default: "" } },
	emits: ["update:modelValue"],
	setup(n, { emit: o }) {
		let s = n, c = o, l = x(!1), u = x(s.modelValue ? H(s.modelValue) : /* @__PURE__ */ new Date()), d = t(() => s.modelValue || ""), f = t(() => {
			if (!d.value) return "Select date";
			let e = H(d.value);
			return `${F[e.getMonth()].slice(0, 3)} ${e.getDate()}, ${e.getFullYear()}`;
		}), p = t(() => `${F[u.value.getMonth()]} ${u.value.getFullYear()}`), h = t(() => {
			let e = u.value.getFullYear(), t = u.value.getMonth(), n = new Date(e, t, 1), r = new Date(n);
			return r.setDate(n.getDate() - n.getDay()), Array.from({ length: 42 }, (e, n) => {
				let i = new Date(r);
				i.setDate(r.getDate() + n);
				let a = V(i);
				return {
					date: i,
					value: a,
					label: i.getDate(),
					other: i.getMonth() !== t,
					selected: a === d.value,
					today: a === V(/* @__PURE__ */ new Date())
				};
			});
		}), g = (e) => {
			u.value = new Date(u.value.getFullYear(), u.value.getMonth() + e, 1);
		}, _ = (e) => {
			c("update:modelValue", e), u.value = H(e), l.value = !1;
		};
		return A(() => s.modelValue, (e) => {
			e && (u.value = H(e));
		}), (t, n) => (y(), i("div", {
			class: "erag-date-picker",
			onFocusout: n[4] ||= (e) => l.value = !1
		}, [a("button", {
			type: "button",
			class: "erag-form-input erag-date-trigger",
			onClick: n[0] ||= (e) => l.value = !l.value
		}, [a("span", null, w(f.value), 1), n[5] ||= a("span", {
			class: "erag-date-trigger-icon",
			"aria-hidden": "true"
		}, null, -1)]), l.value ? (y(), i("div", {
			key: 0,
			class: "erag-date-menu",
			onMousedown: n[3] ||= N(() => {}, ["prevent"])
		}, [
			a("div", it, [
				a("button", {
					type: "button",
					class: "erag-date-nav",
					title: "Previous month",
					onClick: n[1] ||= (e) => g(-1)
				}, "<"),
				a("span", at, w(p.value), 1),
				a("button", {
					type: "button",
					class: "erag-date-nav",
					title: "Next month",
					onClick: n[2] ||= (e) => g(1)
				}, ">")
			]),
			a("div", ot, [(y(!0), i(e, null, S(E(L), (e) => (y(), i("span", {
				key: e,
				class: "erag-date-weekday"
			}, w(e), 1))), 128))]),
			a("div", st, [(y(!0), i(e, null, S(h.value, (e) => (y(), i("button", {
				key: e.value,
				type: "button",
				class: m(["erag-date-day", {
					"erag-other": e.other,
					"erag-selected": e.selected,
					"erag-today": e.today
				}]),
				onClick: (t) => _(e.value)
			}, w(e.label), 11, ct))), 128))])
		], 32)) : r("", !0)], 32));
	}
}), ut = {
	key: 0,
	class: "erag-select-dropdown"
}, dt = ["onClick"], ft = /* @__PURE__ */ l({
	__name: "Select",
	props: /* @__PURE__ */ d({
		options: {},
		placeholder: { default: "Select..." }
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let o = O(n, "modelValue"), s = n, c = x(!1), l = x(null), u = t(() => {
			let e = s.options.find((e) => e.value === o.value);
			return e ? e.label : "";
		}), d = (e) => {
			o.value = e, c.value = !1;
		}, f = (e) => {
			l.value?.contains(e.target) || (c.value = !1);
		};
		return _(() => {
			document.addEventListener("click", f);
		}), v(() => {
			document.removeEventListener("click", f);
		}), (t, f) => (y(), i("div", {
			ref_key: "wrapperRef",
			ref: l,
			class: "erag-custom-select"
		}, [a("button", {
			type: "button",
			class: "erag-form-input erag-select-trigger",
			onClick: f[0] ||= (e) => c.value = !c.value
		}, [a("span", { class: m({ "erag-select-placeholder": !u.value }) }, w(u.value || s.placeholder), 3), a("span", {
			class: m(["erag-select-chevron", { "erag-select-chevron-open": c.value }]),
			"aria-hidden": "true"
		}, [...f[1] ||= [a("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [a("polyline", { points: "6 9 12 15 18 9" })], -1)]], 2)]), c.value ? (y(), i("div", ut, [(y(!0), i(e, null, S(n.options, (e) => (y(), i("button", {
			key: e.value,
			type: "button",
			class: m(["erag-select-option", { "erag-selected": o.value === e.value }]),
			onClick: (t) => d(e.value)
		}, w(e.label), 11, dt))), 128))])) : r("", !0)], 512));
	}
}), pt = {
	key: 0,
	class: "erag-time-dropdown"
}, mt = { class: "erag-time-column" }, ht = ["onClick"], gt = { class: "erag-time-column" }, _t = ["onClick"], vt = { class: "erag-time-column" }, yt = ["onClick"], $ = /* @__PURE__ */ l({
	__name: "TimePicker",
	props: /* @__PURE__ */ d({ placeholder: { default: "Select time" } }, {
		modelValue: { default: "09:00" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let o = O(n, "modelValue"), s = n, c = x(!1), l = x(null), u = [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12"
		], d = [
			"00",
			"05",
			"10",
			"15",
			"20",
			"25",
			"30",
			"35",
			"40",
			"45",
			"50",
			"55"
		], f = ["AM", "PM"], p = x({
			hour: "09",
			minute: "00",
			period: "AM"
		}), h = t(() => `${p.value.hour}:${p.value.minute} ${p.value.period}`), g = () => {
			let [e = "09", t = "00"] = String(o.value || "09:00").split(":"), n = Number(e), r = n >= 12 ? "PM" : "AM", i = n % 12 || 12;
			p.value = {
				hour: String(i).padStart(2, "0"),
				minute: String(Number(t || 0)).padStart(2, "0"),
				period: r
			};
		}, b = () => {
			let e = Number(p.value.hour);
			p.value.period === "PM" && e !== 12 && (e += 12), p.value.period === "AM" && e === 12 && (e = 0), o.value = `${String(e).padStart(2, "0")}:${p.value.minute}`;
		}, C = (e, t) => {
			p.value[e] = t, b();
		}, T = (e) => {
			l.value?.contains(e.target) || (c.value = !1);
		};
		return A(() => o.value, g, { immediate: !0 }), _(() => {
			document.addEventListener("click", T);
		}), v(() => {
			document.removeEventListener("click", T);
		}), (t, n) => (y(), i("div", {
			ref_key: "wrapperRef",
			ref: l,
			class: "erag-time-picker"
		}, [a("button", {
			type: "button",
			class: "erag-form-input erag-time-input",
			onClick: n[0] ||= (e) => c.value = !c.value
		}, [a("span", null, w(h.value || s.placeholder), 1), n[1] ||= a("span", {
			class: "erag-time-clock-icon",
			"aria-hidden": "true"
		}, "◷", -1)]), c.value ? (y(), i("div", pt, [
			a("div", mt, [(y(), i(e, null, S(u, (e) => a("button", {
				key: e,
				type: "button",
				class: m({ "erag-selected": p.value.hour === e }),
				onClick: (t) => C("hour", e)
			}, w(e), 11, ht)), 64))]),
			a("div", gt, [(y(), i(e, null, S(d, (e) => a("button", {
				key: e,
				type: "button",
				class: m({ "erag-selected": p.value.minute === e }),
				onClick: (t) => C("minute", e)
			}, w(e), 11, _t)), 64))]),
			a("div", vt, [(y(), i(e, null, S(f, (e) => a("button", {
				key: e,
				type: "button",
				class: m({ "erag-selected": p.value.period === e }),
				onClick: (t) => C("period", e)
			}, w(e), 11, yt)), 64))])
		])) : r("", !0)], 512));
	}
}), bt = { class: "erag-modal" }, xt = { class: "erag-modal-hdr" }, St = { class: "erag-modal-title" }, Ct = { class: "erag-detail-row" }, wt = { class: "erag-detail-row" }, Tt = {
	key: 0,
	class: "erag-detail-row"
}, Et = { class: "erag-detail-row" }, Dt = {
	key: 1,
	class: "erag-detail-row"
}, Ot = { class: "erag-modal-footer" }, kt = ["disabled"], At = ["disabled"], jt = {
	class: "erag-modal-hdr",
	style: { "margin-bottom": "8px" }
}, Mt = { class: "erag-modal-title" }, Nt = {
	key: 0,
	class: "erag-tab-row"
}, Pt = { class: "erag-form-group erag-title-row" }, Ft = { class: "erag-field-row" }, It = { class: "erag-field-content" }, Lt = {
	class: "erag-form-group erag-form-row",
	style: { "margin-bottom": "0" }
}, Rt = { class: "erag-form-row erag-time-field-grid" }, zt = {
	key: 0,
	class: "erag-form-error",
	style: { "margin-top": "8px" }
}, Bt = { class: "erag-field-row" }, Vt = { class: "erag-field-content" }, Ht = {
	key: 0,
	class: "erag-field-row"
}, Ut = { class: "erag-field-content" }, Wt = ["onMousedown"], Gt = {
	key: 0,
	class: "erag-mention-menu"
}, Kt = {
	key: 0,
	class: "erag-mention-results"
}, qt = ["onMousedown"], Jt = {
	key: 1,
	class: "erag-mention-empty"
}, Yt = { class: "erag-field-row" }, Xt = { class: "erag-field-content" }, Zt = { class: "erag-color-row" }, Qt = ["onClick"], $t = { class: "erag-custom-color-row" }, en = ["value"], tn = { class: "erag-field-row" }, nn = { class: "erag-field-content" }, rn = { class: "erag-modal-footer" }, an = ["disabled"], on = ["disabled"], sn = { class: "erag-form-group erag-title-row" }, cn = { class: "erag-field-row" }, ln = { class: "erag-field-content" }, un = { style: {
	display: "flex",
	"align-items": "center",
	gap: "12px",
	"flex-wrap": "wrap"
} }, dn = { class: "erag-field-row" }, fn = {
	class: "erag-field-content",
	style: {
		display: "flex",
		"align-items": "center",
		height: "36px"
	}
}, pn = { class: "erag-field-row" }, mn = { class: "erag-field-content" }, hn = { class: "erag-field-row" }, gn = { class: "erag-field-content" }, _n = { class: "erag-modal-footer" }, vn = ["disabled"], yn = /* @__PURE__ */ l({
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
	setup(l, { emit: d }) {
		let f = l, p = d, { form: h, save: _, setCustomColor: v, timeError: b } = et({
			calendars: () => f.calendars,
			event: () => f.event,
			onSave: (e) => p("save", e),
			open: () => f.open,
			selectedDate: () => f.selectedDate
		}), x = t(() => f.mentionUsers || []), { addMentionUser: C, availableMentionUsers: T, focusMentionSearch: D, mentionListOpen: O, mentionSearch: P, mentionSearchInput: F, removeMentionUser: I, resetMentionSearch: L, selectedMentionUsers: z } = rt(h, () => x.value);
		A(() => [
			f.open,
			f.event,
			f.selectedDate
		], L, { immediate: !0 }), Xe(() => f.open);
		let { enableTime: B, saveTask: V, task: U } = nt({
			initialTab: () => f.initialTab,
			onSave: (e) => {
				p("save-task", e), Y();
			},
			open: () => f.open,
			selectedDate: () => f.selectedDate
		}), G = t(() => {
			let e = U.activeTab === "event" ? "event" : "task";
			return `${h.id ? "Edit" : "New"} ${e}`;
		}), q = t(() => ({
			create: !0,
			delete: !0,
			update: !0,
			...f.permissions
		})), J = t(() => f.event ? Qe(x.value, f.event) : ""), Y = () => {
			p("close");
		};
		return (t, d) => l.open ? (y(), i("div", {
			key: 0,
			class: "erag-overlay",
			onClick: N(Y, ["self"])
		}, [a("div", bt, [l.mode === "detail" && l.event ? (y(), i(e, { key: 0 }, [
			a("div", {
				class: "erag-detail-bar",
				style: g({ background: l.event.color })
			}, null, 4),
			a("div", xt, [a("span", St, w(l.event.title), 1), a("button", {
				class: "erag-modal-close",
				title: "Close",
				onClick: Y
			}, [...d[27] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			a("div", Ct, [d[28] ||= o("<span class=\"erag-detail-icon\" title=\"Date\"><svg viewBox=\"0 0 24 24\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg></span>", 1), a("span", null, w(E(K)(E(H)(l.event.date))), 1)]),
			a("div", wt, [d[29] ||= a("span", {
				class: "erag-detail-icon",
				title: "Time"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}), a("polyline", { points: "12 6 12 12 16 14" })])], -1), a("span", null, w(E(W)(l.event.start)) + " - " + w(E(W)(l.event.end)), 1)]),
			l.event.desc ? (y(), i("div", Tt, [d[30] ||= o("<span class=\"erag-detail-icon\" title=\"Notes\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></span>", 1), a("span", null, w(l.event.desc), 1)])) : r("", !0),
			a("div", Et, [d[31] ||= a("span", {
				class: "erag-detail-icon",
				title: "Calendar"
			}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z" }), a("path", { d: "m7 7-.01.01" })])], -1), a("span", null, w(E(Ze)(l.calendars, l.event)), 1)]),
			J.value ? (y(), i("div", Dt, [d[32] ||= o("<span class=\"erag-detail-icon\" title=\"Mentioned users\"><svg viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path></svg></span>", 1), a("span", null, w(J.value), 1)])) : r("", !0),
			a("div", Ot, [
				q.value.delete ? (y(), i("button", {
					key: 0,
					class: "erag-btn erag-btn-danger",
					disabled: l.processing,
					onClick: d[0] ||= (e) => t.$emit("delete", l.event)
				}, "Delete", 8, kt)) : r("", !0),
				a("button", {
					class: "erag-btn",
					onClick: Y
				}, "Close"),
				q.value.update ? (y(), i("button", {
					key: 1,
					class: "erag-btn erag-btn-primary",
					disabled: l.processing,
					onClick: d[1] ||= (e) => t.$emit("edit", l.event)
				}, "Edit", 8, At)) : r("", !0)
			])
		], 64)) : (y(), i(e, { key: 1 }, [
			a("div", jt, [a("span", Mt, w(G.value), 1), a("button", {
				class: "erag-modal-close",
				title: "Cancel",
				onClick: Y
			}, [...d[33] ||= [a("svg", {
				class: "erag-modal-close-svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]])]),
			!E(h).id && l.mode === "create" ? (y(), i("div", Nt, [a("button", {
				type: "button",
				class: m(["erag-tab-pill", { "erag-active": E(U).activeTab === "event" }]),
				onClick: d[2] ||= (e) => E(U).activeTab = "event"
			}, " Event ", 2), a("button", {
				type: "button",
				class: m(["erag-tab-pill", { "erag-active": E(U).activeTab === "task" }]),
				onClick: d[3] ||= (e) => E(U).activeTab = "task"
			}, " Task ", 2)])) : r("", !0),
			E(U).activeTab === "event" ? (y(), i(e, { key: 1 }, [
				a("div", Pt, [j(a("input", {
					"onUpdate:modelValue": d[4] ||= (e) => E(h).title = e,
					class: "erag-title-input",
					placeholder: "Add title",
					autofocus: ""
				}, null, 512), [[k, E(h).title]])]),
				a("div", Ft, [d[37] ||= a("div", {
					class: "erag-field-icon",
					title: "Date and Time"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}), a("polyline", { points: "12 6 12 12 16 14" })])], -1), a("div", It, [a("div", Lt, [a("div", null, [d[34] ||= a("label", { class: "erag-form-label" }, "Date", -1), c(lt, {
					modelValue: E(h).date,
					"onUpdate:modelValue": d[5] ||= (e) => E(h).date = e
				}, null, 8, ["modelValue"])]), a("div", Rt, [a("div", null, [d[35] ||= a("label", { class: "erag-form-label" }, "Start", -1), c($, {
					modelValue: E(h).start,
					"onUpdate:modelValue": d[6] ||= (e) => E(h).start = e,
					class: "erag-picker-align-right"
				}, null, 8, ["modelValue"])]), a("div", null, [d[36] ||= a("label", { class: "erag-form-label" }, "End", -1), c($, {
					modelValue: E(h).end,
					"onUpdate:modelValue": d[7] ||= (e) => E(h).end = e,
					class: "erag-picker-align-right"
				}, null, 8, ["modelValue"])])])]), E(b) ? (y(), i("div", zt, w(E(b)), 1)) : r("", !0)])]),
				a("div", Bt, [d[38] ||= a("div", {
					class: "erag-field-icon",
					title: "Calendar"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z" }), a("path", { d: "m7 7-.01.01" })])], -1), a("div", Vt, [c(ft, {
					modelValue: E(h).cal,
					"onUpdate:modelValue": d[8] ||= (e) => E(h).cal = e,
					options: l.calendars.map((e) => ({
						label: e.label,
						value: e.id
					})),
					placeholder: "Select calendar"
				}, null, 8, ["modelValue", "options"])])]),
				l.mentionUsersAllowed && x.value.length ? (y(), i("div", Ht, [d[40] ||= a("div", {
					class: "erag-field-icon",
					title: "Mentions"
				}, [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), a("circle", {
					cx: "12",
					cy: "7",
					r: "4"
				})])], -1), a("div", Ut, [a("div", {
					class: "erag-mention-select",
					onFocusout: d[13] ||= (e) => O.value = !1
				}, [a("div", {
					class: "erag-mention-control",
					onClick: d[12] ||= (...e) => E(D) && E(D)(...e)
				}, [(y(!0), i(e, null, S(E(z), (e) => (y(), i("span", {
					key: e.user_id,
					class: "erag-mention-chip"
				}, [s(w(e.name) + " ", 1), a("button", {
					type: "button",
					class: "erag-mention-remove",
					title: "Remove",
					onMousedown: N((t) => E(I)(e.user_id), ["stop", "prevent"])
				}, [...d[39] ||= [a("svg", {
					class: "erag-mention-remove-svg",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2.5",
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}, [a("path", { d: "M18 6 6 18" }), a("path", { d: "m6 6 12 12" })], -1)]], 40, Wt)]))), 128)), j(a("input", {
					ref_key: "mentionSearchInput",
					ref: F,
					"onUpdate:modelValue": d[9] ||= (e) => u(P) ? P.value = e : null,
					class: "erag-mention-input",
					placeholder: "Search users...",
					onFocus: d[10] ||= (e) => O.value = !0,
					onKeydown: d[11] ||= M((e) => O.value = !1, ["esc"])
				}, null, 544), [[k, E(P)]])]), E(O) ? (y(), i("div", Gt, [E(T).length ? (y(), i("div", Kt, [(y(!0), i(e, null, S(E(T), (e) => (y(), i("button", {
					key: e.user_id,
					type: "button",
					class: "erag-mention-item",
					onMousedown: N((t) => E(C)(e), ["prevent"])
				}, w(e.name), 41, qt))), 128))])) : r("", !0), E(T).length ? r("", !0) : (y(), i("div", Jt, "No users found"))])) : r("", !0)], 32)])])) : r("", !0),
				a("div", Yt, [d[41] ||= o("<div class=\"erag-field-icon\" title=\"Color\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line></svg></div>", 1), a("div", Xt, [a("div", Zt, [(y(!0), i(e, null, S(E(R), (e) => (y(), i("div", {
					key: e,
					class: m(["erag-cswatch", { "erag-sel": E(h).color === e }]),
					style: g({ background: e }),
					onClick: (t) => E(h).color = e
				}, null, 14, Qt))), 128))]), a("div", $t, [
					a("span", {
						class: "erag-custom-color-preview",
						style: g({ background: E(h).color })
					}, null, 4),
					j(a("input", {
						"onUpdate:modelValue": d[14] ||= (e) => E(h).color = e,
						class: "erag-custom-color-picker",
						type: "color",
						"aria-label": "Pick custom color"
					}, null, 512), [[k, E(h).color]]),
					a("input", {
						value: E(h).color,
						class: "erag-custom-color-input",
						maxlength: "7",
						placeholder: "#378ADD",
						onInput: d[15] ||= (e) => E(v)(e.target.value)
					}, null, 40, en)
				])])]),
				a("div", tn, [d[42] ||= o("<div class=\"erag-field-icon\" title=\"Notes\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></div>", 1), a("div", nn, [j(a("textarea", {
					"onUpdate:modelValue": d[16] ||= (e) => E(h).desc = e,
					rows: "3",
					class: "erag-form-input",
					placeholder: "Add notes..."
				}, null, 512), [[k, E(h).desc]])])]),
				a("div", rn, [
					E(h).id && q.value.delete ? (y(), i("button", {
						key: 0,
						class: "erag-btn erag-btn-danger",
						disabled: l.processing,
						onClick: d[17] ||= (e) => t.$emit("delete", { ...E(h) })
					}, "Delete", 8, an)) : r("", !0),
					a("button", {
						class: "erag-btn",
						onClick: Y
					}, "Cancel"),
					(E(h).id ? q.value.update : q.value.create) ? (y(), i("button", {
						key: 1,
						class: "erag-btn erag-btn-primary",
						disabled: l.processing,
						onClick: d[18] ||= (...e) => E(_) && E(_)(...e)
					}, w(E(h).id ? "Update" : "Save"), 9, on)) : r("", !0)
				])
			], 64)) : (y(), i(e, { key: 2 }, [
				a("div", sn, [j(a("input", {
					"onUpdate:modelValue": d[19] ||= (e) => E(U).title = e,
					class: "erag-title-input",
					placeholder: "Add title",
					autofocus: ""
				}, null, 512), [[k, E(U).title]])]),
				a("div", cn, [d[43] ||= o("<div class=\"erag-field-icon\" title=\"Date\"><svg viewBox=\"0 0 24 24\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg></div>", 1), a("div", ln, [a("div", un, [c(lt, {
					modelValue: E(U).date,
					"onUpdate:modelValue": d[20] ||= (e) => E(U).date = e,
					class: "erag-task-date-picker"
				}, null, 8, ["modelValue"]), E(U).timeEnabled ? (y(), n($, {
					key: 0,
					modelValue: E(U).time,
					"onUpdate:modelValue": d[21] ||= (e) => E(U).time = e,
					class: "erag-task-time-picker"
				}, null, 8, ["modelValue"])) : (y(), i("button", {
					key: 1,
					type: "button",
					class: "erag-add-time-btn",
					onClick: d[22] ||= (...e) => E(B) && E(B)(...e)
				}, " Add time "))])])]),
				a("div", dn, [d[44] ||= o("<div class=\"erag-field-icon\" title=\"Add deadline\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle></svg></div>", 1), a("div", fn, [a("span", {
					style: {
						color: "var(--text-muted)",
						"font-size": "13.5px",
						cursor: "pointer"
					},
					onClick: d[23] ||= (...e) => E(B) && E(B)(...e)
				}, "Add deadline")])]),
				a("div", pn, [d[45] ||= o("<div class=\"erag-field-icon\" title=\"Description\"><svg viewBox=\"0 0 24 24\"><line x1=\"21\" x2=\"3\" y1=\"6\" y2=\"6\"></line><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"7\" y1=\"18\" y2=\"18\"></line></svg></div>", 1), a("div", mn, [j(a("textarea", {
					"onUpdate:modelValue": d[24] ||= (e) => E(U).desc = e,
					rows: "3",
					class: "erag-form-input",
					placeholder: "Add description or a Google Drive attachment"
				}, null, 512), [[k, E(U).desc]])])]),
				a("div", hn, [d[46] ||= o("<div class=\"erag-field-icon\" title=\"Task List\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line></svg></div>", 1), a("div", gn, [c(ft, {
					modelValue: E(U).list,
					"onUpdate:modelValue": d[25] ||= (e) => E(U).list = e,
					options: [
						{
							label: "My Tasks",
							value: "My Tasks"
						},
						{
							label: "Work Tasks",
							value: "Work Tasks"
						},
						{
							label: "Personal Tasks",
							value: "Personal Tasks"
						}
					],
					placeholder: "Select task list"
				}, null, 8, ["modelValue"])])]),
				a("div", _n, [a("button", {
					class: "erag-btn",
					onClick: Y
				}, "Cancel"), a("button", {
					class: "erag-btn erag-btn-primary",
					disabled: !E(U).title.trim(),
					onClick: d[26] ||= (...e) => E(V) && E(V)(...e)
				}, "Save", 8, vn)])
			], 64))
		], 64))])])) : r("", !0);
	}
});
//#endregion
//#region src/composables/useMonthGrid.ts
function bn(e, n) {
	return { cells: t(() => {
		let t = e().getFullYear(), r = e().getMonth(), i = new Date(t, r, 1).getDay(), a = new Date(t, r, 1 - i), o = V(/* @__PURE__ */ new Date());
		return Array.from({ length: 42 }, (e, t) => {
			let i = new Date(a);
			i.setDate(i.getDate() + t);
			let s = V(i);
			return {
				date: i,
				events: Q(n(), s),
				other: i.getMonth() !== r,
				today: s === o,
				value: s
			};
		});
	}) };
}
//#endregion
//#region src/components/MonthView.vue?vue&type=script&setup=true&lang.ts
var xn = { class: "erag-month-wrap" }, Sn = { class: "erag-month-dow-row" }, Cn = { class: "erag-month-grid" }, wn = ["onClick"], Tn = { class: "erag-day-num" }, En = ["onClick"], Dn = {
	key: 0,
	class: "erag-more"
}, On = /* @__PURE__ */ l({
	__name: "MonthView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { cells: o } = bn(() => n.currentDate, () => n.events);
		return (t, n) => (y(), i("div", xn, [a("div", Sn, [(y(!0), i(e, null, S(E(I), (e) => (y(), i("div", {
			key: e,
			class: "erag-dow"
		}, w(e), 1))), 128))]), a("div", Cn, [(y(!0), i(e, null, S(E(o), (n) => (y(), i("div", {
			key: n.value,
			class: m(["erag-cell", {
				"erag-other-month": n.other,
				"erag-today": n.today
			}]),
			onClick: (e) => t.$emit("add", n.value)
		}, [
			a("div", Tn, w(n.date.getDate()), 1),
			(y(!0), i(e, null, S(n.events.slice(0, 3), (e) => (y(), i("div", {
				key: E(Z)(e),
				class: "erag-pill",
				style: g({
					background: `${e.color}22`,
					color: e.color
				}),
				onClick: N((n) => t.$emit("detail", e), ["stop"])
			}, w(e.start === "00:00" ? "" : `${E(W)(e.start)} `) + w(e.title), 13, En))), 128)),
			n.events.length > 3 ? (y(), i("div", Dn, "+" + w(n.events.length - 3) + " more", 1)) : r("", !0)
		], 10, wn))), 128))])]));
	}
}), kn = { class: "erag-settings-container" }, An = { class: "erag-settings-section" }, jn = { class: "erag-sync-card" }, Mn = { class: "erag-sync-row" }, Nn = { class: "erag-sync-row" }, Pn = { class: "erag-settings-section" }, Fn = { class: "erag-dropdown-wrapper" }, In = { class: "erag-duration-text" }, Ln = { class: "erag-duration-value" }, Rn = {
	key: 0,
	class: "erag-duration-menu"
}, zn = ["onClick"], Bn = { class: "erag-settings-section" }, Vn = { class: "erag-impexp-container" }, Hn = { class: "erag-impexp-box" }, Un = {
	class: "erag-btn erag-btn-task",
	style: {
		display: "inline-flex",
		cursor: "pointer"
	}
}, Wn = /* @__PURE__ */ l({
	__name: "SettingsView",
	setup(t) {
		let n = x(!1), c = x(!1), l = x(60), u = x(!1), d = [
			15,
			20,
			30,
			45,
			60,
			90,
			120
		], f = () => {
			n.value = !n.value;
		}, p = () => {
			c.value = !c.value;
		}, h = (e) => {
			l.value = e, u.value = !1;
		}, g = (e) => {
			let t = e.target;
			t.files && t.files.length && alert(`Imported file: ${t.files[0].name}`);
		}, _ = () => {
			let e = JSON.stringify({ message: "Calendar Export Data" }), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "calendar-export.json", r.click();
		};
		return (t, v) => (y(), i("div", kn, [
			a("div", An, [v[3] ||= a("h2", { class: "erag-settings-title" }, "Sync Settings", -1), a("div", jn, [a("div", Mn, [v[1] ||= o("<div class=\"erag-sync-info\"><svg class=\"erag-sync-logo\" viewBox=\"0 0 24 24\"><path fill=\"#EA4335\" d=\"M12 5.04c1.78 0 3.39.61 4.65 1.8l3.48-3.48C17.98 1.19 15.22 0 12 0 7.31 0 3.25 2.69 1.25 6.63l4.08 3.16c.96-2.88 3.66-4.75 6.67-4.75z\"></path><path fill=\"#4285F4\" d=\"M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.55z\"></path><path fill=\"#FBBC05\" d=\"M5.33 14.78a7.12 7.12 0 0 1 0-4.56L1.25 7.06a11.96 11.96 0 0 0 0 9.88l4.08-3.16z\"></path><path fill=\"#34A853\" d=\"M12 23.04c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.01 0-5.71-1.88-6.67-4.75L1.25 16.77c2 3.94 6.06 6.27 10.75 6.27z\"></path></svg><div class=\"erag-sync-text-group\"><span class=\"erag-sync-name\">Google Calendar</span><span class=\"erag-sync-desc\">Sync events with your Google account</span></div></div>", 1), a("button", {
				type: "button",
				class: m(["erag-btn", { "erag-btn-task": n.value }]),
				onClick: f
			}, w(n.value ? "Connected" : "Sync"), 3)]), a("div", Nn, [v[2] ||= o("<div class=\"erag-sync-info\"><svg class=\"erag-sync-logo\" viewBox=\"0 0 23 23\"><path fill=\"#f35325\" d=\"M0 0h11v11H0z\"></path><path fill=\"#80bb0a\" d=\"M12 0h11v11H12z\"></path><path fill=\"#00a1f1\" d=\"M0 12h11v11H0z\"></path><path fill=\"#ffb900\" d=\"M12 12h11v11H12z\"></path></svg><div class=\"erag-sync-text-group\"><span class=\"erag-sync-name\">Microsoft Outlook</span><span class=\"erag-sync-desc\">Sync events with your Outlook calendar</span></div></div>", 1), a("button", {
				type: "button",
				class: m(["erag-btn", { "erag-btn-task": c.value }]),
				onClick: p
			}, w(c.value ? "Connected" : "Sync"), 3)])])]),
			a("div", Pn, [v[6] ||= a("h2", { class: "erag-settings-title" }, "Event settings", -1), a("div", Fn, [a("div", {
				class: "erag-duration-trigger",
				onClick: v[0] ||= (e) => u.value = !u.value
			}, [a("div", In, [v[4] ||= a("span", { class: "erag-duration-label" }, "Default duration", -1), a("span", Ln, w(l.value) + " minutes", 1)]), v[5] ||= a("svg", {
				class: "erag-duration-caret",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5"
			}, [a("path", { d: "m6 9 6 6 6-6" })], -1)]), u.value ? (y(), i("div", Rn, [(y(), i(e, null, S(d, (e) => a("div", {
				key: e,
				class: m(["erag-duration-item", { "erag-selected": l.value === e }]),
				onClick: (t) => h(e)
			}, w(e) + " minutes ", 11, zn)), 64))])) : r("", !0)])]),
			a("div", Bn, [a("div", Vn, [a("div", Hn, [
				v[8] ||= a("h2", {
					class: "erag-impexp-header",
					style: {
						color: "#1d4ed8",
						"font-size": "20px"
					}
				}, "Import", -1),
				v[9] ||= a("p", { class: "erag-impexp-desc" }, "Upload event data files (.ics or .json) to load them into the calendar.", -1),
				a("label", Un, [v[7] ||= s(" Choose file ", -1), a("input", {
					type: "file",
					accept: ".ics,.json",
					style: { display: "none" },
					onChange: g
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
});
//#endregion
//#region src/composables/useWeekGrid.ts
function Gn(e, n) {
	let r = t(() => V(/* @__PURE__ */ new Date())), { hours: i, nowTop: a } = ne();
	return {
		eventsFor: (e) => Q(n(), e),
		eventStyle: ee,
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
var Kn = { class: "erag-week-wrap" }, qn = { class: "erag-week-head" }, Jn = { class: "erag-wday-name" }, Yn = { class: "erag-wday-num" }, Xn = { class: "erag-week-scroll" }, Zn = { class: "erag-time-col" }, Qn = { class: "erag-time-label" }, $n = ["onClick"], er = ["onClick"], tr = /* @__PURE__ */ l({
	__name: "WeekView",
	props: {
		currentDate: {},
		events: {}
	},
	emits: ["add", "detail"],
	setup(t) {
		let n = t, { eventsFor: o, eventStyle: s, hours: c, nowTop: l, today: u, weekDays: d } = Gn(() => n.currentDate, () => n.events);
		return (t, n) => (y(), i("div", Kn, [a("div", qn, [n[0] ||= a("div", { class: "erag-wgutter" }, null, -1), (y(!0), i(e, null, S(E(d), (e) => (y(), i("div", {
			key: E(V)(e),
			class: m(["erag-wday-head", { "erag-today": E(V)(e) === E(u) }])
		}, [a("div", Jn, w(E(I)[e.getDay()]), 1), a("div", Yn, w(e.getDate()), 1)], 2))), 128))]), a("div", Xn, [a("div", Zn, [(y(!0), i(e, null, S(E(c), (e) => (y(), i("div", {
			key: e,
			class: "erag-time-slot"
		}, [a("span", Qn, w(e === 0 ? "" : E(W)(`${String(e).padStart(2, "0")}:00`)), 1)]))), 128))]), (y(!0), i(e, null, S(E(d), (d) => (y(), i("div", {
			key: E(V)(d),
			class: "erag-wcol"
		}, [
			(y(!0), i(e, null, S(E(c), (e) => (y(), i("div", {
				key: e,
				class: "erag-wslot",
				onClick: (e) => t.$emit("add", E(V)(d))
			}, null, 8, $n))), 128)),
			(y(!0), i(e, null, S(E(o)(d), (e) => (y(), i("div", {
				key: E(Z)(e),
				class: "erag-wevent",
				style: g(E(s)(e)),
				onClick: N((n) => t.$emit("detail", e), ["stop"])
			}, w(E(W)(e.start)) + " " + w(e.title), 13, er))), 128)),
			E(V)(d) === E(u) ? (y(), i("div", {
				key: 0,
				class: "erag-now-line",
				style: g({ top: `${E(l)}px` })
			}, [...n[1] ||= [a("div", { class: "erag-now-dot" }, null, -1)]], 4)) : r("", !0)
		]))), 128))])]));
	}
}), nr = { class: "erag-body" }, rr = { class: "erag-main" }, ir = /* @__PURE__ */ l({
	inheritAttrs: !1,
	__name: "Calendar",
	props: {
		resource: { default: void 0 },
		calendar: { default: void 0 },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		config: { default: () => ({}) },
		configColors: { default: () => ({}) },
		permissions: { default: void 0 },
		routes: { default: () => ({}) },
		style: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		visitOptions: { default: () => ({}) },
		headless: {
			type: Boolean,
			default: !1
		},
		mentionUsers: { default: void 0 },
		persistWithInertia: {
			type: Boolean,
			default: void 0
		},
		calendars: { default: void 0 },
		events: { default: void 0 },
		initialDate: { default: void 0 },
		initialView: { default: void 0 },
		sidebarOpen: { type: Boolean }
	},
	emits: [
		"create",
		"delete",
		"update",
		"create-task"
	],
	setup(e, { emit: o }) {
		let s = D(), l = e, u = o, { calendarOptions: d, config: p, mentionUsers: m, permissions: g, routes: _, shouldPersist: v } = pe(l), b = Y(T(() => d.value)), S = ge(_.value, l.visitOptions);
		A(() => p.value.sidebar, (e) => {
			e === !0 && (b.sidebarOpen.value = !0), e === !1 && (b.sidebarOpen.value = !1);
		}, { immediate: !0 });
		let { closeModal: w, modalMode: O, modalOpen: k, openCreate: j, openDetail: M, openEdit: N, selectedDate: P, selectedEvent: F } = de(b.currentDate, () => g.value.create, () => g.value.update), { deleteEvent: I, saveEvent: L } = fe({
			calendar: b,
			canDelete: () => g.value.delete,
			closeModal: w,
			emit: {
				create: (e) => u("create", e),
				delete: (e) => u("delete", e),
				update: (e) => u("update", e)
			},
			inertiaEvents: S,
			shouldPersist: v
		}), R = x("event"), z = (e) => {
			R.value = "event", j(e);
		}, B = () => {
			R.value = "task", j();
		}, V = (e) => {
			console.log("[calendar UI] task created:", e), u("create-task", e);
		}, H = t(() => ({
			...b,
			errors: S.errors,
			processing: S.processing,
			closeModal: w,
			deleteEvent: I,
			modalMode: O,
			modalOpen: k,
			openCreate: z,
			openDetail: M,
			openEdit: N,
			saveEvent: L,
			selectedDate: P,
			selectedEvent: F
		})), U = (e, t) => {
			let n = e.trim().match(/^#?([0-9a-f]{6})$/i);
			if (!n) return null;
			let r = n[1];
			return `rgba(${Number.parseInt(r.slice(0, 2), 16)}, ${Number.parseInt(r.slice(2, 4), 16)}, ${Number.parseInt(r.slice(4, 6), 16)}, ${t})`;
		}, W = t(() => {
			let { class: e, style: t, ...n } = s;
			return n;
		}), G = t(() => [
			"erag-cal-root",
			s.class,
			l.class
		]), K = {
			background: "--bg-main",
			border: "--border-color",
			danger: "--color-danger",
			dangerHover: "--color-danger-hover",
			dangerLight: "--color-danger-light",
			hoverBackground: "--bg-hover",
			modalBackground: "--modal-bg",
			modalBorder: "--modal-border",
			overlay: "--overlay-bg",
			primary: "--color-primary",
			primaryAccent: "--color-primary-accent",
			primaryHover: "--color-primary-hover",
			primaryLight: "--color-primary-light",
			primaryShadow: "--color-primary-shadow",
			primarySoft: "--color-primary-soft",
			primarySoftHover: "--color-primary-soft-hover",
			controlAccent: "--control-accent",
			controlBackground: "--control-bg",
			controlBorder: "--control-border",
			controlFocus: "--control-focus",
			controlShadow: "--control-shadow",
			sidebarBackground: "--bg-sidebar",
			softBackground: "--bg-soft",
			surfaceMuted: "--surface-muted",
			surfaceMutedHover: "--surface-muted-hover",
			swatchBorder: "--swatch-border",
			task: "--color-task",
			taskHover: "--color-task-hover",
			taskShadow: "--color-task-shadow",
			textMuted: "--text-muted",
			textPrimary: "--text-primary",
			textSecondary: "--text-secondary",
			toolbarBackground: "--bg-toolbar"
		}, q = (e) => {
			let t = { ...e.variables || {} }, n = e.primary?.trim();
			if (n) {
				t["--color-primary"] = n, t["--color-primary-hover"] = e.primaryHover || n, t["--color-primary-accent"] = e.primaryAccent || n;
				let r = U(n, .12), i = U(n, .16), a = U(n, .1), o = U(n, .08);
				r && !e.primaryLight && (t["--color-primary-light"] = r), i && !e.primaryShadow && (t["--color-primary-shadow"] = i), a && !e.primarySoft && (t["--color-primary-soft"] = a), o && !e.primarySoftHover && (t["--color-primary-soft-hover"] = o);
			}
			for (let [n, r] of Object.entries(K)) {
				let i = e[n];
				typeof i == "string" && i.trim() && (t[r] = i.trim());
			}
			return t;
		}, J = t(() => [
			q(l.configColors),
			s.style,
			l.style
		]);
		return (t, o) => e.headless ? C(t.$slots, "default", h(f({ key: 0 }, H.value))) : (y(), i("div", f({ key: 1 }, W.value, {
			class: G.value,
			style: J.value
		}), [
			c(Be, {
				search: E(b).search.value,
				"can-create": E(g).create,
				title: E(b).title.value,
				view: E(b).currentView.value,
				onAdd: o[0] ||= (e) => z(),
				onNext: o[1] ||= (e) => E(b).navigate(1),
				onPrev: o[2] ||= (e) => E(b).navigate(-1),
				onSearch: o[3] ||= (e) => E(b).search.value = e,
				onSidebarToggle: o[4] ||= (e) => E(b).sidebarOpen.value = !E(b).sidebarOpen.value,
				onToday: o[5] ||= (e) => E(b).goToday(),
				onView: o[6] ||= (e) => E(b).setView(e)
			}, null, 8, [
				"search",
				"can-create",
				"title",
				"view"
			]),
			a("div", nr, [E(p).sidebar === !1 ? r("", !0) : (y(), n(Ee, {
				key: 0,
				calendars: E(b).calendars.value,
				"current-date": E(b).currentDate.value,
				"mini-date": E(b).miniDate.value,
				open: E(b).sidebarOpen.value,
				"visible-calendars": E(b).visibleCalendars.value,
				onAdd: o[7] ||= (e) => z(),
				onAddTask: o[8] ||= (e) => B(),
				onMiniNext: o[9] ||= (e) => E(b).miniDate.value = new Date(E(b).miniDate.value.getFullYear(), E(b).miniDate.value.getMonth() + 1, 1),
				onMiniPrev: o[10] ||= (e) => E(b).miniDate.value = new Date(E(b).miniDate.value.getFullYear(), E(b).miniDate.value.getMonth() - 1, 1),
				onSelectDate: o[11] ||= (e) => E(b).selectDate(e),
				onToggleCalendar: o[12] ||= (e) => E(b).toggleCalendar(e)
			}, null, 8, [
				"calendars",
				"current-date",
				"mini-date",
				"open",
				"visible-calendars"
			])), a("main", rr, [E(b).currentView.value === "month" ? (y(), n(On, {
				key: 0,
				"current-date": E(b).currentDate.value,
				events: E(b).filteredEvents.value,
				onAdd: z,
				onDetail: E(M)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : E(b).currentView.value === "week" ? (y(), n(tr, {
				key: 1,
				"current-date": E(b).currentDate.value,
				events: E(b).filteredEvents.value,
				onAdd: z,
				onDetail: E(M)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : E(b).currentView.value === "day" ? (y(), n(Ye, {
				key: 2,
				"current-date": E(b).currentDate.value,
				events: E(b).filteredEvents.value,
				onAdd: z,
				onDetail: E(M)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : E(b).currentView.value === "agenda" ? (y(), n(ue, {
				key: 3,
				"current-date": E(b).currentDate.value,
				events: E(b).filteredEvents.value,
				onDetail: E(M)
			}, null, 8, [
				"current-date",
				"events",
				"onDetail"
			])) : (y(), n(Wn, { key: 4 }))])]),
			c(yn, {
				calendars: E(b).calendars.value,
				event: E(F),
				"mention-users": E(m),
				"mention-users-allowed": E(p).mention_users !== !1,
				mode: E(O),
				open: E(k),
				"initial-tab": R.value,
				permissions: E(g),
				processing: E(S).processing.value,
				"selected-date": E(P),
				onClose: E(w),
				onDelete: E(I),
				onEdit: E(N),
				onSave: E(L),
				onSaveTask: V
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
		], 16));
	}
});
//#endregion
export { ue as AgendaView, ir as Calendar, Ee as CalendarSidebar, Be as CalendarToolbar, lt as DatePicker, Ye as DayView, yn as EventModal, On as MonthView, $ as TimePicker, tr as WeekView, Ze as calendarLabel, V as dateToString, I as days, Z as eventKey, ee as eventTimeStyle, Q as eventsForDate, K as formatLongDate, q as formatMonthYear, W as formatTime, J as formatWeekRange, De as inputValue, Qe as mentionedUsersLabel, F as months, G as normalizeTime, H as parseDate, L as shortDays, te as sortEventsByTime, R as swatchColors, U as timeToMinutes, re as useAgendaGroups, Xe as useBodyScrollLock, Y as useCalendar, de as useCalendarModal, fe as useCalendarMutations, pe as useCalendarResource, Ve as useDaySchedule, et as useEventForm, nt as useEventTaskForm, ge as useInertiaCalendarEvents, rt as useMentionUsers, ve as useMiniCalendar, bn as useMonthGrid, ne as useTimeSlots, Gn as useWeekGrid, z as views };

//# sourceMappingURL=inertia-calendar.js.map