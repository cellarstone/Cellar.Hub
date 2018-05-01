import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/state/state/application.state';
import { Observable } from 'rxjs';
import { SetCLICommandAction, RunAllCellarWorkflowsAction, StopAllCellarWorkflowsAction } from 'app/state/actions/workflow.actions';

@Component({
  selector: 'workflow-cli',
  templateUrl: './workflow-cli.html',
  styleUrls: ['./workflow-cli.scss']
})
export class WorkflowCli implements OnInit {

  cliCommand$: Observable<string>;
  cliResult$: Observable<string[]>;

  constructor(private store: Store<ApplicationState>) {
    this.cliCommand$ = this.store.select(mapCliCommandFromState);
    this.cliResult$ = this.store.select(mapCliResultFromState);
  }

  ngOnInit() {
  }

  showRunningProcesses() {
    let command = "ps -ef";
    // this.store.dispatch(new SetCLICommandAction(command));
    // this.store.dispatch(new LoadRunningProcessesAction());
  }

  runAllWorkflows() {
    let command = "custom script";
    // this.store.dispatch(new SetCLICommandAction(command));
    // this.store.dispatch(new RunAllCellarWorkflowsAction());
  }

  stopAllWorkflows() {
    let command = "custom script";
    // this.store.dispatch(new SetCLICommandAction(command));
    // this.store.dispatch(new StopAllCellarWorkflowsAction());
  }

  getActualDirectory() {
    let command = "ls -l";
    // this.store.dispatch(new SetCLICommandAction(command));
    // this.store.dispatch(new GetActualDirectoryAction());
  }

}


function mapCliResultFromState(state: ApplicationState): string[] {
  if (state.storeData == undefined) {
    return undefined;
  }
  return state.storeData.cli_result;
} 


function mapCliCommandFromState(state: ApplicationState): string {
  if (state.storeData == undefined) {
    return undefined;
  }
  return state.storeData.cli_command;
} 