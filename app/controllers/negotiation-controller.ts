import { domInjector } from "../decorators/domInjector.js"
import { inspect } from "../decorators/inspect.js"
import { logRuntime } from "../decorators/logRuntime.js"
import { DaysOfTheWeek } from "../enums/dayOfTheWeeks.js"
import { Negotiation } from "../models/negotiation.js"
import { Negotiations } from "../models/negotiations.js"
import { MessageView } from "../views/message-view.js"
import { NegotiationsView } from "../views/negotiations-view.js"

export class NegotiationController {
  @domInjector('#data')
  private inputDate: HTMLInputElement
  @domInjector('#quantidade') 
  private inputAmount: HTMLInputElement
  @domInjector('#valor') 
  private inputValue: HTMLInputElement 
  private negotiations = new Negotiations()
  private negotiationsView = new NegotiationsView('#negotiationsView')
  private messageView = new MessageView('#messageView')

  constructor() {
    this.negotiationsView.update(this.negotiations)
  }

  @inspect
  @logRuntime()
  add(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputAmount.value,
      this.inputValue.value
    )
    if(!this.itsBusinessDay(negotiation.date)){
        this.messageView.update('Serão aceitas somente negociações em dias uteis')
      return
    } 
 
    this.negotiations.add(negotiation)
    this.clearForm()
    this.updateView()
  }

  private itsBusinessDay(date: Date) {
    return date.getDay() != DaysOfTheWeek.SUNDAY && date.getDay() != DaysOfTheWeek.SATURDAY
  }

   private clearForm(): void {
    this.inputDate.value = ''
    this.inputAmount.value = ''
    this.inputValue.value = ''
    this.inputDate.focus()
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations)
    this.messageView.update('Negociação adicionada com sucesso!')
  }
}