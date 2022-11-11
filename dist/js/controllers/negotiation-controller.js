var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/domInjector.js";
import { inspect } from "../decorators/inspect.js";
import { logRuntime } from "../decorators/logRuntime.js";
import { DaysOfTheWeek } from "../enums/dayOfTheWeeks.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputAmount.value, this.inputValue.value);
        if (!this.itsBusinessDay(negotiation.date)) {
            this.messageView.update('Serão aceitas somente negociações em dias uteis');
            return;
        }
        this.negotiations.add(negotiation);
        this.clearForm();
        this.updateView();
    }
    itsBusinessDay(date) {
        return date.getDay() != DaysOfTheWeek.SUNDAY && date.getDay() != DaysOfTheWeek.SATURDAY;
    }
    clearForm() {
        this.inputDate.value = '';
        this.inputAmount.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso!');
    }
}
__decorate([
    domInjector('#data')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantidade')
], NegotiationController.prototype, "inputAmount", void 0);
__decorate([
    domInjector('#valor')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect,
    logRuntime()
], NegotiationController.prototype, "add", null);
