import { loading } from '@/composables/core/map';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name, mapRef } from './MapDisplay.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'map-container'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'Skeleton', typeof __VLS_localComponents, "Skeleton", "Skeleton", "Skeleton">;
__VLS_components.Skeleton;
// @ts-ignore
[Skeleton,];
__VLS_intrinsicElements.div;
(__VLS_ctx.loading);
(__VLS_ctx.propsLoading);
if (__VLS_ctx.loading || __VLS_ctx.propsLoading) {
{
const __VLS_0 = ({} as 'Skeleton' extends keyof typeof __VLS_ctx ? { 'Skeleton': typeof __VLS_ctx.Skeleton; } : typeof __VLS_resolvedLocalAndGlobalComponents).Skeleton;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, height: ((__VLS_ctx.height)), width: ("100%"), }));
({} as { Skeleton: typeof __VLS_0; }).Skeleton;
const __VLS_2 = __VLS_1({ ...{}, height: ((__VLS_ctx.height)), width: ("100%"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, height: ((__VLS_ctx.height)), width: ("100%"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
}
// @ts-ignore
[loading, propsLoading, loading, propsLoading, height, height, height,];
}
{
const __VLS_5 = __VLS_intrinsicElements["div"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, ref: ("mapRef"), ...(__VLS_ctx.$attrs), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, ref: ("mapRef"), ...(__VLS_ctx.$attrs), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
({ height: __VLS_ctx.height });
__VLS_directiveFunction(__VLS_ctx.vShow)((!__VLS_ctx.loading && !__VLS_ctx.propsLoading));
// @ts-ignore
(__VLS_ctx.mapRef);
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["map-container"];
__VLS_styleScopedClasses["z-0"];
}
var __VLS_slots!: {};
// @ts-ignore
[$attrs, $attrs, height, loading, propsLoading, mapRef,];
return __VLS_slots;
}
